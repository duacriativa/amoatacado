declare module 'react-simple-maps' {
    import * as React from 'react';

    interface ProjectionConfig {
        scale?: number;
        center?: [number, number];
        rotate?: [number, number, number];
    }

    interface ComposableMapProps {
        projection?: string;
        projectionConfig?: ProjectionConfig;
        width?: number;
        height?: number;
        style?: React.CSSProperties;
        className?: string;
        children?: React.ReactNode;
    }

    interface ZoomableGroupProps {
        zoom?: number;
        center?: [number, number];
        onMoveEnd?: (params: { zoom: number; coordinates: [number, number] }) => void;
        children?: React.ReactNode;
    }

    interface GeographiesProps {
        geography: string | object;
        children: (params: { geographies: Geography[] }) => React.ReactNode;
    }

    interface Geography {
        rsmKey: string;
        [key: string]: unknown;
    }

    interface GeographyProps {
        geography: Geography;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
        style?: {
            default?: React.CSSProperties;
            hover?: React.CSSProperties;
            pressed?: React.CSSProperties;
        };
        [key: string]: unknown;
    }

    interface MarkerProps {
        coordinates: [number, number];
        onMouseEnter?: (event: React.MouseEvent<SVGGElement>) => void;
        onMouseLeave?: (event: React.MouseEvent<SVGGElement>) => void;
        onClick?: (event: React.MouseEvent<SVGGElement>) => void;
        children?: React.ReactNode;
        [key: string]: unknown;
    }

    export const ComposableMap: React.FC<ComposableMapProps>;
    export const ZoomableGroup: React.FC<ZoomableGroupProps>;
    export const Geographies: React.FC<GeographiesProps>;
    export const Geography: React.FC<GeographyProps>;
    export const Marker: React.FC<MarkerProps>;
    export const Line: React.FC<Record<string, unknown>>;
    export const Annotation: React.FC<Record<string, unknown>>;
}
