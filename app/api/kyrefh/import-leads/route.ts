import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Simple secret check — set KYREFH_IMPORT_SECRET in Vercel env vars
const IMPORT_SECRET = process.env.KYREFH_IMPORT_SECRET;

interface ImportRow {
    name: string;
    phone?: string;
    cidade?: string;
    uf?: string;
    business_type?: string;
    volume?: string;
    source?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    status?: 'lead' | 'cliente' | 'inativo';
    created_at?: string;
}

export async function POST(request: Request) {
    const secret = request.headers.get('x-import-secret');
    if (IMPORT_SECRET && secret !== IMPORT_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const rows: ImportRow[] = Array.isArray(body) ? body : body.rows;

        if (!rows || rows.length === 0) {
            return NextResponse.json({ error: 'No rows provided' }, { status: 400 });
        }

        const supabase = getSupabaseClient();
        const records = rows.map(r => ({
            name: r.name || 'Importado',
            phone: r.phone || null,
            cidade: r.cidade || null,
            uf: r.uf || null,
            business_type: r.business_type || null,
            volume: r.volume || null,
            source: r.source || null,
            utm_source: r.utm_source || null,
            utm_medium: r.utm_medium || null,
            utm_campaign: r.utm_campaign || null,
            status: (['lead', 'cliente', 'inativo'].includes(r.status || '') ? r.status : 'lead') as 'lead' | 'cliente' | 'inativo',
            ...(r.created_at ? { created_at: r.created_at } : {}),
        }));

        const { error, count } = await supabase
            .from('kyrefh_leads')
            .insert(records, { count: 'exact' });

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ success: true, inserted: count ?? records.length });
    } catch (err) {
        console.error('[import-leads] error:', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
