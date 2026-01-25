import type { GameResponse, GameData } from "./roblox.types";

export async function fetchServerData(placeId: string, gameInstanceId: string) {
    try {
        const valraResponse = await fetch(
            `https://apis.rovalra.com/v1/server_details?place_id=${placeId}&server_ids=${gameInstanceId}`,
            {
                method: "GET",
                headers: {
                    "User-Agent": "Thumbnail Generation",
                },
            },
        );

        if (!valraResponse.ok) throw new Error("valra your api sucks");

        const valraData = await valraResponse.json();
        return valraData;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchThumbnailData(id: string, type: string, size: string, isCircular: boolean) {
    const data = [
        {
            // generate a random request id
            // i dont even know if we need to add a request id, i just add it cause why not
            requestId: Math.random().toString(36).substring(2, 15),
            targetId: id,
            type: type,
            size: size,
            format: "png",
            isCircular: isCircular,
        }
    ];

    try {
        const thumbnailResponse = await fetch(
            `https://thumbnails.roblox.com/v1/batch`,
            {
                method: "POST",
                headers: {
                    "User-Agent": "Mozilla/5.0 (compatible)",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            },
        );

        if (!thumbnailResponse.ok)
            throw new Error(thumbnailResponse.statusText);

        const thumbnailData: any = await thumbnailResponse.json();
        console.log(thumbnailData);
        const thumbnail = thumbnailData.data?.[0].imageUrl;

        return thumbnail;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchGameData(placeId: string) {
    try {
        const universeResponse = await fetch(
            `https://apis.roblox.com/universes/v1/places/${placeId}/universe`,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0 (compatible)",
                },
            },
        );

        if (!universeResponse.ok) throw new Error("failed to fetch universe");

        const universeData: any = await universeResponse.json();
        const universeId = universeData.universeId;

        const gameResponse = await fetch(
            `https://games.roblox.com/v1/games?universeIds=${universeId}`,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0 (compatible)",
                },
            },
        );

        if (!gameResponse.ok) throw new Error("failed to fetch game data");

        const json = await gameResponse.json() as GameResponse;
        
        if (!json.data || !Array.isArray(json.data) || json.data.length === 0) {
            console.warn('no game found');
            return null;
        }
        
        // is there a better way to do this???
        const response: GameData = {
            name: json.data.map(game => game.name).join('\n'),
            description: json.data.map(game => game.description).join('\n'),
            playing: json.data.map(game => game.playing).join('\n')
        }
        
        return response;
    } catch (error) {
        console.error("error fetching game data:", error);
        return null;
    }
}
