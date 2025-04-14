
export default interface Platform {
    id: number;
    name: string;
    slug: string;
    description?: string;
    platforms?: PlatformChild[];
}

export interface PlatformChild{
    id: number;
    name: string;
    slug: string;
    games_count?: number;
    image_background?: string;
    image?: string | null;
}
