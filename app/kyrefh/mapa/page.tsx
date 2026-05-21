import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('./MapView'), { ssr: false });

export default function KyrefhMapaPage() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-bebas, sans-serif)', fontSize: 24, letterSpacing: '0.15em', color: 'rgba(245,239,230,0.3)' }}>
                    KYREFH · MAPA
                </span>
            </div>
        }>
            <MapView />
        </Suspense>
    );
}
