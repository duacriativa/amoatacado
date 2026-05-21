import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { getCityCoords } from '@/lib/brazil-cities';

export const dynamic = 'force-dynamic';

type LeadRow = { cidade: string | null; uf: string | null; status: string };

interface CityAgg {
    cidade: string;
    uf: string;
    lead: number;
    cliente: number;
    inativo: number;
    total: number;
    coords: [number, number];
}

export async function GET() {
    try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
            .from('kyrefh_leads')
            .select('cidade, uf, status');

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        const cityMap: Record<string, CityAgg> = {};

        for (const row of (data as LeadRow[]) || []) {
            const cidade = row.cidade?.trim() || '';
            const uf = row.uf?.trim().toUpperCase() || '';
            if (!uf) continue;

            const key = `${cidade.toLowerCase()}_${uf.toLowerCase()}`;
            if (!cityMap[key]) {
                const coords = getCityCoords(cidade, uf);
                if (!coords) continue;
                cityMap[key] = { cidade, uf, lead: 0, cliente: 0, inativo: 0, total: 0, coords };
            }

            const status = row.status as 'lead' | 'cliente' | 'inativo';
            if (status === 'lead' || status === 'cliente' || status === 'inativo') {
                cityMap[key][status]++;
                cityMap[key].total++;
            }
        }

        return NextResponse.json(Object.values(cityMap), {
            headers: { 'Cache-Control': 'no-store' },
        });
    } catch (err) {
        console.error('[mapa] error:', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
