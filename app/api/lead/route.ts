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

        // 2. Send email notification (Sunliv Specific)
        const isSunliv = body.clientSlug === 'sunliv' || body.clientSlug === 'sunliv-moda-praia-atacado';

        if (isSunliv) {
            const smtpPass = process.env.SMTP_PASS;
            if (!smtpPass) {
                console.error('[SMTP] Skip email: SMTP_PASS not found in env');
            } else {
                try {
                    const transporter = nodemailer.createTransport({
                        host: 'mail.amoatacado.com.br',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'sunliv@amoatacado.com.br',
                            pass: smtpPass,
                        },
                        // Timeout increased for slower SMTP servers
                        connectionTimeout: 10000,
                        greetingTimeout: 10000,
                    });

                    await transporter.sendMail({
                        from: '"Sunliv Leads" <sunliv@amoatacado.com.br>',
                        to: 'sunliv@amoatacado.com.br',
                        subject: `Novo Lead Sunliv: ${body.name}`,
                        html: `
                            <div style="font-family: sans-serif; max-width: 600px;">
                                <h2 style="color: #0A3D4D;">Novo Lead Recebido - Sunliv</h2>
                                <p><strong>Nome:</strong> ${body.name}</p>
                                <p><strong>Email:</strong> ${body.email}</p>
                                <p><strong>WhatsApp:</strong> ${body.phone}</p>
                                <p><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
                                <hr />
                                <p style="font-size: 12px; color: #666;">Enviado via API AmoAtacado</p>
                            </div>
                        `,
                    });
                    console.log(`[SMTP] Success: Lead from ${body.name} sent to sunliv@amoatacado.com.br`);
                } catch (emailError) {
                    const error = emailError as {
                        message?: string;
                        code?: string;
                        command?: string;
                        response?: string;
                        stack?: string
                    };
                    // Log specific error details to Vercel Logs for debugging
                    console.error('[SMTP] Failed to send email:', {
                        message: error.message,
                        code: error.code,
                        command: error.command,
                        response: error.response,
                        stack: error.stack
                    });
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
