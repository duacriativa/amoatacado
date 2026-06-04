'use client';

import { useEffect, useState } from 'react';

type StatusFilter = 'all' | 'lead' | 'cliente' | 'inativo';

interface CityData {
    cidade: string;
    uf: string;
    lead: number;
    cliente: number;
    inativo: number;
    total: number;
    coords: [number, number];
}

const STATUS_COLORS: Record<string, string> = {
    lead: '#f59e0b',
    cliente: '#22c55e',
    inativo: 'rgba(245,239,230,0.35)',
};

const FILTER_LABELS: Record<StatusFilter, string> = {
    all: 'Todos',
    lead: 'Leads',
    cliente: 'Clientes',
    inativo: 'Inativos',
};

export default function MapView() {
    const [data, setData] = useState<CityData[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<StatusFilter>('all');

    useEffect(() => {
        fetch('/api/kyrefh/mapa')
            .then(r => r.json())
            .then((d: CityData[]) => { setData(d); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const totals = data.reduce(
        (acc, d) => ({ lead: acc.lead + d.lead, cliente: acc.cliente + d.cliente, inativo: acc.inativo + d.inativo, total: acc.total + d.total }),
        { lead: 0, cliente: 0, inativo: 0, total: 0 }
    );
    const estadosCobertos = new Set(data.map(d => d.uf)).size;

    const filteredData = (filter === 'all'
        ? data
        : data.filter(d => d[filter] > 0)
    ).sort((a, b) => {
        const va = filter === 'all' ? a.total : a[filter];
        const vb = filter === 'all' ? b.total : b[filter];
        return vb - va;
    });

    const statCards = [
        { label: 'Total', value: totals.total, color: 'rgba(245,239,230,0.9)' },
        { label: 'Leads', value: totals.lead, color: '#f59e0b' },
        { label: 'Clientes', value: totals.cliente, color: '#22c55e' },
        { label: 'Estados', value: estadosCobertos, color: '#6b8cda' },
    ];

    return (
        <main style={{ minHeight: '100vh', background: '#050505', color: '#f5efe6', fontFamily: 'var(--font-manrope, sans-serif)' }}>
            {/* Header */}
            <div style={{ padding: '32px 40px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                    <span style={{ fontFamily: 'var(--font-bebas, sans-serif)', fontSize: 26, letterSpacing: '0.12em', color: '#f5efe6' }}>KYREFH</span>
                    <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.35)' }}>Cobertura por Cidade</span>
                </div>
                {loading && (
                    <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.35)' }}>
                        Carregando...
                    </span>
                )}
            </div>

            {/* Stats */}
            <div style={{ padding: '24px 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {statCards.map(({ label, value, color }) => (
                    <div key={label} style={{ padding: '18px 22px', border: '1px solid rgba(245,239,230,0.07)', borderRadius: 6, background: 'rgba(245,239,230,0.02)' }}>
                        <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.35)', marginBottom: 6 }}>{label}</div>
                        <div style={{ fontFamily: 'var(--font-bebas, sans-serif)', fontSize: 44, color, lineHeight: 1 }}>
                            {loading ? '—' : value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter tabs */}
            <div style={{ padding: '0 40px 20px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(['all', 'lead', 'cliente', 'inativo'] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '7px 18px',
                            border: `1px solid ${filter === f ? '#f59e0b' : 'rgba(245,239,230,0.12)'}`,
                            borderRadius: 4,
                            background: filter === f ? 'rgba(245,158,11,0.1)' : 'transparent',
                            color: filter === f ? '#f59e0b' : 'rgba(245,239,230,0.5)',
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                        }}
                    >
                        {FILTER_LABELS[f]}
                        {!loading && f !== 'all' && (
                            <span style={{ marginLeft: 6, opacity: 0.6, fontWeight: 400 }}>
                                {f === 'lead' ? totals.lead : f === 'cliente' ? totals.cliente : totals.inativo}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* City list */}
            <div style={{ padding: '0 40px 48px' }}>
                <div style={{ background: '#0a1220', borderRadius: 8, border: '1px solid rgba(245,239,230,0.06)', overflow: 'hidden' }}>
                    {/* Table header */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 80px 80px 80px', padding: '12px 20px', borderBottom: '1px solid rgba(245,239,230,0.06)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.3)' }}>
                        <span>Cidade</span>
                        <span style={{ textAlign: 'center' }}>UF</span>
                        <span style={{ textAlign: 'center', color: '#f59e0b' }}>Leads</span>
                        <span style={{ textAlign: 'center', color: '#22c55e' }}>Clientes</span>
                        <span style={{ textAlign: 'center', color: 'rgba(245,239,230,0.35)' }}>Inativos</span>
                        <span style={{ textAlign: 'center' }}>Total</span>
                    </div>

                    {loading ? (
                        <div style={{ padding: '48px 20px', textAlign: 'center', color: 'rgba(245,239,230,0.25)', fontSize: 13 }}>Carregando dados...</div>
                    ) : filteredData.length === 0 ? (
                        <div style={{ padding: '48px 20px', textAlign: 'center', color: 'rgba(245,239,230,0.25)', fontSize: 13 }}>Nenhuma cidade encontrada.</div>
                    ) : (
                        filteredData.map((city, i) => {
                            const isEven = i % 2 === 0;
                            return (
                                <div
                                    key={`${city.cidade}_${city.uf}`}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 60px 80px 80px 80px 80px',
                                        padding: '12px 20px',
                                        background: isEven ? 'transparent' : 'rgba(245,239,230,0.015)',
                                        borderBottom: '1px solid rgba(245,239,230,0.04)',
                                        fontSize: 13,
                                        alignItems: 'center',
                                    }}
                                >
                                    <span style={{ color: '#f5efe6' }}>{city.cidade}</span>
                                    <span style={{ textAlign: 'center', color: 'rgba(245,239,230,0.4)', fontSize: 11 }}>{city.uf}</span>
                                    <span style={{ textAlign: 'center', color: city.lead > 0 ? STATUS_COLORS.lead : 'rgba(245,239,230,0.2)', fontWeight: city.lead > 0 ? 700 : 400 }}>{city.lead}</span>
                                    <span style={{ textAlign: 'center', color: city.cliente > 0 ? STATUS_COLORS.cliente : 'rgba(245,239,230,0.2)', fontWeight: city.cliente > 0 ? 700 : 400 }}>{city.cliente}</span>
                                    <span style={{ textAlign: 'center', color: city.inativo > 0 ? 'rgba(245,239,230,0.45)' : 'rgba(245,239,230,0.2)', fontWeight: city.inativo > 0 ? 700 : 400 }}>{city.inativo}</span>
                                    <span style={{ textAlign: 'center', color: 'rgba(245,239,230,0.7)', fontWeight: 600 }}>{city.total}</span>
                                </div>
                            );
                        })
                    )}
                </div>

                <p style={{ marginTop: 12, fontSize: 11, color: 'rgba(245,239,230,0.2)', letterSpacing: '0.05em', textAlign: 'right' }}>
                    {!loading && `${filteredData.length} cidade${filteredData.length !== 1 ? 's' : ''} · `}
                    Para importar leads históricos, use POST /api/kyrefh/import-leads
                </p>
            </div>
        </main>
    );
}
