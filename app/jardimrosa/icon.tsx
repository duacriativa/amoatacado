import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
    const petalStyle = (rotate: number) => ({
        position: 'absolute' as const,
        width: 22,
        height: 32,
        left: 21,
        top: 0,
        background: '#FF69B4',
        borderRadius: '50%',
        transformOrigin: '50% 100%',
        transform: `rotate(${rotate}deg)`,
    });

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div style={{ position: 'relative', width: 64, height: 64, display: 'flex' }}>
                    <div style={petalStyle(0)} />
                    <div style={petalStyle(72)} />
                    <div style={petalStyle(144)} />
                    <div style={petalStyle(216)} />
                    <div style={petalStyle(288)} />
                    <div
                        style={{
                            position: 'absolute',
                            width: 22,
                            height: 22,
                            left: 21,
                            top: 21,
                            borderRadius: '50%',
                            background: '#FFD700',
                        }}
                    />
                </div>
            </div>
        ),
        { ...size }
    );
}
