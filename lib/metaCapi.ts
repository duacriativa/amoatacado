type MetaCapiUserData = {
    client_ip_address?: string;
    client_user_agent?: string;
    fbp?: string;
    fbc?: string;
};

type MetaCapiEventInput = {
    pixelId: string;
    accessToken: string;
    eventName: string;
    eventId: string;
    eventSourceUrl: string;
    userData: MetaCapiUserData;
};

export async function sendMetaCapiEvent({
    pixelId,
    accessToken,
    eventName,
    eventId,
    eventSourceUrl,
    userData,
}: MetaCapiEventInput) {
    const response = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: [
                {
                    event_name: eventName,
                    event_time: Math.floor(Date.now() / 1000),
                    event_id: eventId,
                    event_source_url: eventSourceUrl,
                    action_source: 'website',
                    user_data: userData,
                },
            ],
            access_token: accessToken,
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Meta CAPI error ${response.status}: ${text}`);
    }

    return response.json();
}
