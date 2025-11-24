/** @format */

import type { PageServerLoad } from "./$types";

interface GameData {
    name: string;
    description: string;
    playing: number;
}

interface GameThumbnail {
    imageUrl: string;
}

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
            playing: null,
        };
    }

    const ogImageUrl = `https://gcrazydude.xyz/api/generateOG?placeId=${placeId}${gameInstanceId ? `&gameInstanceId=${gameInstanceId}` : ""}`;

    const gameDataResponse: Response = await fetch(
        `https://gcrazydude.xyz/api/fetchGameData?placeId=${placeId}`,
    );
    const gameData = (await gameDataResponse.json()) as GameData;

    const gameThumbnailResponse: Response = await fetch(
        `https://gcrazydude.xyz/api/fetchThumbnailData?id=${placeId}&type=GameThumbnail&size=384x216`,
    );
    const gameThumbnailData =
        (await gameThumbnailResponse.json()) as GameThumbnail;
    const gameThumbnail: string = gameThumbnailData.imageUrl;

    const gameName: string = gameData?.name;
    const gameDescription: string = gameData?.description;

    const formatter = new Intl.NumberFormat("en-US", { notation: "compact" });

    const players: string = formatter.format(gameData?.playing);

    return {
        placeId,
        gameInstanceId,
        launchData,
        gameThumbnail,
        ogImageUrl,
        gameName,
        gameDescription,
        players,
    };
};
