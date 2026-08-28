import { NextResponse } from 'next/server';
import { sendMetaCapiEvent } from '@/lib/metaCapi';

export const dynamic = 'force-dynamic';

const PIXEL_ID = '1412500514094194';

export async function POST(request: Request) {
    try {
        const accessToken = process.env.JARDIM_ROSA_META_CAPI_TOKEN;
        if (!accessToken) {
            // CAPI token not configured yet — skip silently, browser pixel still fires.
            return NextResponse.json({ skipped: true });
        }

        const body = await request.json();
        const { eventName, eventId, eventSourceUrl, fbp, fbc } = body;

        if (!eventName || !eventId) {
            return NextResponse.json({ error: 'Missing eventName or eventId' }, { status: 400 });
        }

        const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
        const userAgent = request.headers.get('user-agent') || undefined;

        await sendMetaCapiEvent({
            pixelId: PIXEL_ID,
            accessToken,
            eventName,
            eventId,
            eventSourceUrl: eventSourceUrl || request.url,
            userData: {
                client_ip_address: clientIp,
                client_user_agent: userAgent,
                fbp,
                fbc,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[META CAPI] Error sending event:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
