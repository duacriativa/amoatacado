import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.email || !body.phone) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 1. Determine which webhook to use based on clientSlug
        const isSunliv = body.clientSlug === 'sunliv' || body.clientSlug === 'sunliv-moda-praia-atacado';
        const isLibertyJeans = body.clientSlug === 'liberty-jeans';

        let webhookUrl = process.env.LEADS_WEBHOOK_URL; // Default/Global fallback

        if (isLibertyJeans && process.env.LIBERTY_JEANS_WEBHOOK_URL) {
            webhookUrl = process.env.LIBERTY_JEANS_WEBHOOK_URL;
        } else if (isSunliv && process.env.SUNLIV_WEBHOOK_URL) {
            webhookUrl = process.env.SUNLIV_WEBHOOK_URL;
        }

        // Create a list of background tasks to run in parallel
        const tasks: Promise<any>[] = [];

        // 1. Webhook
        if (webhookUrl) {
            tasks.push(
                fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...body,
                        timestamp: new Date().toISOString(),
                        source_url: request.url
                    }),
                }).catch(err => {
                    console.error('Error sending lead to webhook:', err);
                    return null;
                })
            );
        }

        // 2. Email Notification
        if ((isSunliv || isLibertyJeans) && process.env.SMTP_PASS) {
            const clientEmail = isSunliv ? 'sunliv@amoatacado.com.br' : 'libertyjeansoficial@gmail.com';
            const clientName = isSunliv ? 'Sunliv' : 'Liberty Jeans';

            const transporter = nodemailer.createTransport({
                host: 'mail.amoatacado.com.br',
                port: 465,
                secure: true,
                auth: {
                    user: 'comercial@amoatacado.com.br',
                    pass: process.env.SMTP_PASS,
                },
                connectionTimeout: 5000, // Reduced timeout for speed
                greetingTimeout: 5000,
            });

            tasks.push(
                transporter.sendMail({
                    from: `"${clientName} Leads" <comercial@amoatacado.com.br>`,
                    to: clientEmail,
                    subject: `Novo Lead ${clientName}: ${body.name}`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px;">
                            <h2 style="color: #0A3D4D;">Novo Lead Recebido - ${clientName}</h2>
                            <p><strong>Nome:</strong> ${body.name}</p>
                            <p><strong>Email:</strong> ${body.email}</p>
                            <p><strong>WhatsApp:</strong> ${body.phone}</p>
                            ${body.companyName ? `<p><strong>Empresa:</strong> ${body.companyName}</p>` : ''}
                            ${body.modelType ? `<p><strong>Modelo:</strong> ${body.modelType}</p>` : ''}
                            ${body.brandMoment ? `<p><strong>Momento da Marca:</strong> ${body.brandMoment}</p>` : ''}
                            ${body.orderVolume ? `<p><strong>Volume:</strong> ${body.orderVolume}</p>` : ''}
                            ${body.mainFocus ? `<p><strong>Foco:</strong> ${body.mainFocus}</p>` : ''}
                            ${body.startDate ? `<p><strong>Previsão Início:</strong> ${body.startDate}</p>` : ''}
                            <p><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
                            <hr />
                            <p style="font-size: 12px; color: #666;">Enviado via API AmoAtacado</p>
                        </div>
                    `,
                }).then(() => {
                    console.log(`[SMTP] Success: Lead from ${body.name} sent to ${clientEmail}`);
                }).catch(err => {
                    console.error('[SMTP] Failed to send email:', err);
                })
            );
        }

        // 3. Backup delivery (Google Sheets)
        let backupUrl = process.env.LEADS_BACKUP_URL;
        if (isLibertyJeans && process.env.LIBERTY_JEANS_BACKUP_URL) {
            backupUrl = process.env.LIBERTY_JEANS_BACKUP_URL;
        } else if (isSunliv && (process.env.SUNLIV_BACKUP_URL || process.env.LEADS_BACKUP_sunliv)) {
            backupUrl = process.env.SUNLIV_BACKUP_URL || process.env.LEADS_BACKUP_sunliv;
        }

        if (backupUrl) {
            tasks.push(
                fetch(backupUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...body, backup: true }),
                }).then(() => {
                    console.log(`[BACKUP] Success: Lead from ${body.name} sent to backup`);
                }).catch(err => {
                    console.error('[BACKUP] Failed to send to backup URL:', err);
                })
            );
        }

        // Wait for all tasks to complete in parallel
        // We use allSettled to ensure that one failure doesn't block the others or the response
        if (tasks.length > 0) {
            await Promise.allSettled(tasks);
        }

        return NextResponse.json({ success: true, message: 'Lead captured successfully' });
    } catch (error) {
        console.error('Error processing lead:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
