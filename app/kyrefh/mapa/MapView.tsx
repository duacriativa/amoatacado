'use client';

import { useEffect, useState, useCallback } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';

const GEO_URL = 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.json';

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
    inativo: 'rgba(245,239,230,0.3)',
};

const FILTER_LABELS: Record<StatusFilter, string> = {
    all: 'Todos',
    lead: 'Leads',
    cliente: 'Clientes',
    inativo: 'Inativos',
};

function getMarkerColor(city: CityData, filter: StatusFilter): string {
    if (filter !== 'all') return STATUS_COLORS[filter];
    if (city.cliente > 0 && city.cliente >= city.lead) return STATUS_COLORS.cliente;
    if (city.inativo > 0 && city.inativo > city.lead && city.inativo > city.cliente) return STATUS_COLORS.inativo;
    return STATUS_COLORS.lead;
}

function getMarkerRadius(count: number): number {
    return Math.max(5, Math.min(22, Math.sqrt(count) * 5));
}

export default function MapView() {
    const [data, setData] = useState<CityData[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<StatusFilter>('all');
    const [tooltip, setTooltip] = useState<{ city: CityData; x: number; y: number } | null>(null);
    const [position, setPosition] = useState({ coordinates: [-52, -16] as [number, number], zoom: 1 });

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

    const filteredData = filter === 'all'
        ? data
        : data.filter(d => d[filter] > 0);

    const handleZoomIn = useCallback(() => {
        setPosition(p => ({ ...p, zoom: Math.min(p.zoom * 1.5, 8) }));
    }, []);
    const handleZoomOut = useCallback(() => {
        setPosition(p => ({ ...p, zoom: Math.max(p.zoom / 1.5, 1) }));
    }, []);
    const handleReset = useCallback(() => {
        setPosition({ coordinates: [-52, -16], zoom: 1 });
    }, []);

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
                    <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.35)' }}>Mapa de Cobertura</span>
                </div>
                {loading && (
                    <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.35)' }}>
                        Carregando...
                    </span>
                )}
            </div>

            {/* Stats */}
            <div style={{ padding: '24px 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }} className="grid-cols-2 sm:grid-cols-4">
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
                            transition: 'all .15s',
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

                {/* Zoom controls */}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                    {[
                        { label: '+', action: handleZoomIn },
                        { label: '−', action: handleZoomOut },
                        { label: '⊙', action: handleReset },
                    ].map(({ label, action }) => (
                        <button
                            key={label}
                            onClick={action}
                            style={{
                                width: 32, height: 32,
                                border: '1px solid rgba(245,239,230,0.12)',
                                borderRadius: 4,
                                background: 'transparent',
                                color: 'rgba(245,239,230,0.5)',
                                fontSize: 16,
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Map container */}
            <div style={{ padding: '0 40px 48px', position: 'relative' }}>
                <div style={{ background: '#0a1220', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(245,239,230,0.06)', position: 'relative' }}>
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{ scale: 820, center: [-52, -15] }}
                        width={960}
                        height={720}
                        style={{ width: '100%', height: 'auto' }}
                    >
                        <ZoomableGroup
                            zoom={position.zoom}
                            center={position.coordinates}
                            onMoveEnd={({ zoom, coordinates }) => setPosition({ zoom, coordinates: coordinates as [number, number] })}
                        >
                            <Geographies geography={GEO_URL}>
                                {({ geographies }) =>
                                    geographies.map((geo) => (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill="#1a2747"
                                            stroke="rgba(245,239,230,0.12)"
                                            strokeWidth={0.5}
                                            style={{
                                                default: { outline: 'none' },
                                                hover: { fill: '#243566', outline: 'none' },
                                                pressed: { outline: 'none' },
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>

                            {filteredData.map((city) => {
                                const count = filter === 'all' ? city.total : city[filter];
                                const r = getMarkerRadius(count) / position.zoom;
                                const color = getMarkerColor(city, filter);
                                return (
                                    <Marker
                                        key={`${city.cidade}_${city.uf}`}
                                        coordinates={city.coords}
                                        onMouseEnter={(e: React.MouseEvent<SVGGElement>) => {
                                            const rect = (e.target as SVGElement).closest('svg')?.getBoundingClientRect();
                                            const x = rect ? e.clientX - rect.left : 0;
                                            const y = rect ? e.clientY - rect.top : 0;
                                            setTooltip({ city, x, y });
                                        }}
                                        onMouseLeave={() => setTooltip(null)}
                                    >
                                        <circle
                                            r={r}
                                            fill={color}
                                            fillOpacity={0.7}
                                            stroke={color}
                                            strokeWidth={1 / position.zoom}
                                            strokeOpacity={0.5}
                                            style={{ cursor: 'pointer', transition: 'r 0.2s' }}
                                        />
                                    </Marker>
                                );
                            })}
                        </ZoomableGroup>
                    </ComposableMap>

                    {/* Tooltip */}
                    {tooltip && (
                        <div style={{
                            position: 'absolute',
                            top: 16, right: 16,
                            background: 'rgba(10,18,32,0.95)',
                            border: '1px solid rgba(245,239,230,0.1)',
                            borderRadius: 6,
                            padding: '14px 18px',
                            minWidth: 180,
                            pointerEvents: 'none',
                            backdropFilter: 'blur(8px)',
                        }}>
                            <div style={{ fontFamily: 'var(--font-bebas, sans-serif)', fontSize: 20, letterSpacing: '0.05em', marginBottom: 10 }}>
                                {tooltip.city.cidade} <span style={{ color: 'rgba(245,239,230,0.4)', fontSize: 14 }}>{tooltip.city.uf}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                {[
                                    { label: 'Leads', value: tooltip.city.lead, color: '#f59e0b' },
                                    { label: 'Clientes', value: tooltip.city.cliente, color: '#22c55e' },
                                    { label: 'Inativos', value: tooltip.city.inativo, color: 'rgba(245,239,230,0.35)' },
                                ].map(({ label, value, color }) => (
                                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, fontSize: 12 }}>
                                        <span style={{ color: 'rgba(245,239,230,0.45)' }}>{label}</span>
                                        <span style={{ color, fontWeight: 700 }}>{value}</span>
                                    </div>
                                ))}
                                <div style={{ borderTop: '1px solid rgba(245,239,230,0.08)', marginTop: 4, paddingTop: 6, display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                                    <span style={{ color: 'rgba(245,239,230,0.45)' }}>Total</span>
                                    <span style={{ color: '#f5efe6', fontWeight: 700 }}>{tooltip.city.total}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Legend */}
                    <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', gap: 14, alignItems: 'center', background: 'rgba(10,18,32,0.8)', padding: '8px 14px', borderRadius: 4, backdropFilter: 'blur(6px)' }}>
                        {[
                            { color: '#f59e0b', label: 'Lead' },
                            { color: '#22c55e', label: 'Cliente' },
                            { color: 'rgba(245,239,230,0.3)', label: 'Inativo' },
                        ].map(({ color, label }) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 9, height: 9, borderRadius: '50%', background: color, flexShrink: 0 }} />
                                <span style={{ fontSize: 11, letterSpacing: '0.08em', color: 'rgba(245,239,230,0.5)', textTransform: 'uppercase' }}>{label}</span>
                            </div>
                        ))}
                        <span style={{ fontSize: 10, color: 'rgba(245,239,230,0.2)', marginLeft: 6 }}>
                            {filteredData.length} cidade{filteredData.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>

                {/* Import hint */}
                <p style={{ marginTop: 12, fontSize: 11, color: 'rgba(245,239,230,0.2)', letterSpacing: '0.05em', textAlign: 'right' }}>
                    Para importar leads históricos da planilha, use POST /api/kyrefh/import-leads
                </p>
            </div>
        </main>
    );
}
