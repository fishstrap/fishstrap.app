import { selectNextCookie } from "$lib/utils/robloxAuth";
import type { AssetType, ThumbnailData, ThumbnailResponse, GenericDataResponse, UniverseResponse, UniverseData } from "./roblox.types";
import { version } from "../../../package.json";

const defaultHeaders: {[header:string]: string} = {
        "User-Agent": `FishstrapWeb/${version}`,
        "Content-Type": "application/json"
}

export async function fetchThumbnailData(id: number, type: AssetType, size: string, isCircular: boolean) : Promise<string | null> {
    const data: ThumbnailData[] = [
        {
            // generate a random request id
            // i dont even know if we need to add a request id, i just add it cause why not
            requestId: Math.random().toString(36).substring(2, 15),
            targetId: id,
            type: type,
            size: size,
            format: "png",
            isCircular: isCircular
        }
    ];

    try {
        const thumbnailResponse: Response = await fetch(
            "https://thumbnails.roblox.com/v1/batch",
            {
                method: "POST",
                headers: defaultHeaders,
                body: JSON.stringify(data),
            },
        );

        if (!thumbnailResponse.ok)
            throw new Error(`Unable to generate thumbnail: ${thumbnailResponse.statusText}`);

        const thumbnailData: GenericDataResponse<ThumbnailResponse> = await thumbnailResponse.json();
        const thumbnail: ThumbnailResponse | undefined = thumbnailData.data[0];
        if (!thumbnail?.imageUrl)
            throw new Error("Requested thumbnail was not found");

        return thumbnail.imageUrl;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchGameData(placeId: string) : Promise<UniverseData | null> {
    try {
        const universeResponse: Response = await fetch(
            `https://apis.roblox.com/universes/v1/places/${placeId}/universe`,
            { headers: defaultHeaders },
        );

        if (!universeResponse.ok) 
            throw new Error("Failed to fetch universe id");

        const universeData: UniverseResponse = await universeResponse.json();
        const universeId: number = universeData.universeId;

        const gameResponse: Response = await fetch(
            `https://games.roblox.com/v1/games?universeIds=${universeId},1`,
            {
                headers: {
                    ...defaultHeaders,
                    ...{"Cookie": ".ROBLOSECURITY=" + selectNextCookie()}
                },
            },
        );

        if (!gameResponse.ok) 
            throw new Error("Failed to fetch universe data");

        const json: GenericDataResponse<UniverseData> = await gameResponse.json();
        if (!json.data || !Array.isArray(json.data) || json.data.length === 0) {
            console.warn('Requested universe was not found');
            return null;
        }
        
        return json.data?.[0];
    } catch (error) {
        console.error("Error fetching game data: ", error);
        return null;
    }
}
