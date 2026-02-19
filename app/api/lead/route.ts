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

        // 1. Send data to external webhook (Global)
        const webhookUrl = process.env.LEADS_WEBHOOK_URL;
        if (webhookUrl) {
            try {
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...body,
                        timestamp: new Date().toISOString(),
                        source_url: request.url
                    }),
                });
            } catch (webhookError) {
                console.error('Error sending lead to webhook:', webhookError);
            }
        }

        // 2. Send email notification (Sunliv & Liberty Jeans Specific)
        const isSunliv = body.clientSlug === 'sunliv' || body.clientSlug === 'sunliv-moda-praia-atacado';
        const isLibertyJeans = body.clientSlug === 'liberty-jeans';

        if (isSunliv || isLibertyJeans) {
            const smtpPass = process.env.SMTP_PASS;
            if (!smtpPass) {
                console.error('[SMTP] Skip email: SMTP_PASS not found in env');
            } else {
                try {
                    const clientEmail = isSunliv ? 'sunliv@amoatacado.com.br' : 'libertyjeansoficial@gmail.com';
                    const clientName = isSunliv ? 'Sunliv' : 'Liberty Jeans';

                    const transporter = nodemailer.createTransport({
                        host: 'mail.amoatacado.com.br',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'comercial@amoatacado.com.br', // Using a generic sender if available, or sunliv if forced
                            pass: smtpPass,
                        },
                        connectionTimeout: 10000,
                        greetingTimeout: 10000,
                    });

                    await transporter.sendMail({
                        from: `"${clientName} Leads" <comercial@amoatacado.com.br>`,
                        to: clientEmail,
                        subject: `Novo Lead ${clientName}: ${body.name}`,
                        html: `
                            <div style="font-family: sans-serif; max-width: 600px;">
                                <h2 style="color: #0A3D4D;">Novo Lead Recebido - ${clientName}</h2>
                                <p><strong>Nome:</strong> ${body.name}</p>
                                <p><strong>Email:</strong> ${body.email}</p>
                                <p><strong>WhatsApp:</strong> ${body.phone}</p>
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
                    });
                    console.log(`[SMTP] Success: Lead from ${body.name} sent to ${clientEmail}`);
                } catch (emailError) {
                    console.error('[SMTP] Failed to send email:', emailError);
                }
            }
        }

        // 3. Backup delivery (Optional: Google Sheets / Secondary Webhook)
        const backupUrl = process.env.LEADS_BACKUP_URL;
        if (backupUrl) {
            try {
                await fetch(backupUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...body, backup: true }),
                });
            } catch (backupError) {
                console.error('[BACKUP] Failed to send to backup URL:', backupError);
            }
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
