declare namespace google {
    namespace maps {
        interface MapOptions {
            center?: {lat: number; lng: number};
            zoom?: number;
            styles?: MapTypeStyle[];
            [key: string]: any;
        }

        interface LatLngLiteral {
            lat: number;
            lng: number;
        }

        interface MapTypeStyle {
            elementType?: string;
            featureType?: string;
            stylers: Array<{
                color?: string;
                visibility?: string;
                weight?: number;
                [key: string]: any;
            }>;
        }

        interface MapOptions {
            styles?: MapTypeStyle[];
            
        }
    }
}

declare module "@capacitor/google-maps" {
    export interface GoogleMapConfig {
        center?: {
            lat: number;
            lng: number;
        };
        zoom?: number;
        styles?: Array<{
            elementType?: string;
            featureType?: string;
            stylers: Array<{
                color?: string;
                visibility?: string;
                weight?: number;
                [key: string]: any;
            }>;
        }>;
        [key: string]: any;
    }

    export class GoogleMap {
        static create(options: {
            id: string;
            element: HTMLElement;
            apiKey: string;
            config: GoogleMapConfig;
            forceCreate?: boolean;
        }): Promise<GoogleMap>;

        destroy(): Promise<void>;
        enableTouch(): Promise<void>;
        disableTouch(): Promise<void>;
        setCamera(config: { zoom?: number; center?: { lat: number; lng: number; } }): Promise<void>;
    }
}