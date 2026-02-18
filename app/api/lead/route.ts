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
        if (body.clientSlug === 'sunliv-moda-praia-atacado' && process.env.SMTP_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    host: 'mail.amoatacado.com.br',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'sunliv@amoatacado.com.br',
                        pass: process.env.SMTP_PASS,
                    },
                });

                const mailOptions = {
                    from: '"Amo Atacado Leads" <sunliv@amoatacado.com.br>',
                    to: 'sunliv@amoatacado.com.br',
                    subject: `Novo Lead Sunliv: ${body.name}`,
                    html: `
                        <h3>Novo lead recebido na página Sunliv</h3>
                        <p><strong>Nome:</strong> ${body.name}</p>
                        <p><strong>Email:</strong> ${body.email}</p>
                        <p><strong>WhatsApp:</strong> ${body.phone}</p>
                        <p><strong>Loja:</strong> ${body.companyName || 'Não informado'}</p>
                        <br>
                        <p><i>Dados técnicos do envio:</i></p>
                        <pre>${JSON.stringify(body, null, 2)}</pre>
                    `,
                };

                await transporter.sendMail(mailOptions);
            } catch (emailError) {
                console.error('Error sending email:', emailError);
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
