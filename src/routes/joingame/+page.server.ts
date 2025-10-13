import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url }) => {
    const placeId = url.searchParams.get("placeId");
    const gameInstanceId = url.searchParams.get("gameInstanceId");
    const launchData = url.searchParams.get("launchData");

    if (!placeId) {
        return {
            placeId: null,
            gameInstanceId: null,
            ogImageUrl: null,
            launchData: null,
        }
    }

    async function fetchGameData(placeId: string) {
        try {
            const universeResponse = await fetch(
                `https://apis.roblox.com/universes/v1/places/${placeId}/universe`,
                {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (compatible)"
                    }
                }
            )

            if (!universeResponse.ok) throw new Error("failed to fetch universe")

            const universeData = await universeResponse.json()
            const universeId = universeData.universeId

            const gameResponse = await fetch(
                `https://games.roblox.com/v1/games?universeIds=${universeId}`,
                {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (compatible)"
                    }
                }
            )

            if (!gameResponse.ok) throw new Error("failed to fetch game data")

            const gameData = await gameResponse.json()
            return gameData.data?.[0] || null
        } catch (error) {
            console.error("Error fetching game data:", error)
            return null
        }
    }

    async function fetchThumbnail(placeId: string, type: string, size: string, isCircular: boolean) {
        const requestData = [
            {
                "targetId": placeId,
                "type": type,
                "size": size,
                "format": "png",
                "isCircular": isCircular
            }
        ];

        try {
            const thumbnailResponse = await fetch(
                `https://thumbnails.roblox.com/v1/batch`,
                {
                    method: "POST",
                    headers: {
                        "User-Agent": "Mozilla/5.0 (compatible)"
                    },
                    body: JSON.stringify(requestData)
                }
            )

            if (!thumbnailResponse.ok) throw new Error("failed to fetch thumbnail")

            const thumbnailData = await thumbnailResponse.json();
            const thumbnail = thumbnailData.data?.[0].imageUrl;

            return thumbnail;
        } catch (error) {
            console.error(error);
        }
    }

    const ogImageUrl = `${url.origin}/api/og-image?placeId=${placeId}${gameInstanceId ? `&gameInstanceId=${gameInstanceId}` : ""}`
    const gameData = await fetchGameData(placeId);
    const gameThumbnail = await fetchThumbnail(placeId, "GameThumbnail", "384x216", false);
    const gameName = gameData?.name;
    const gameDescription = gameData?.description;

    return {
        placeId,
        gameInstanceId,
        launchData,
        gameThumbnail,
        ogImageUrl,
        gameName,
        gameDescription
    }
}