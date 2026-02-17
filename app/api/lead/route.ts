import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields (basic check, as UI already does validation)
        if (!body.name || !body.email || !body.phone) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Send data to external webhook (e.g., Pipedream, Make, Zapier)
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
                // We don't fail the request if the webhook fails, but we log it.
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
