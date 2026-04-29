/** @format */

import type { PageServerLoad } from "./$types";
import { fetchGameData, fetchThumbnailData } from "$lib/utils/roblox";
import type { UniverseData } from "$lib/utils/roblox.types";

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
        };
    }

    const gameData: UniverseData | null = (await fetchGameData(
        placeId,
    )) as UniverseData;

    let gameName: string = "Roblox Experience";
    if (gameData?.name) gameName = gameData?.name;

    const gameDescription: string | undefined = gameData?.description;

    const formatter = new Intl.NumberFormat("en-US", { notation: "compact" });
    let players: string = "?";

    if (gameData?.playing) players = formatter.format(gameData.playing);

    const gameThumbnail: string | null = await fetchThumbnailData(
        Number.parseInt(placeId),
        "GameThumbnail",
        "384x216",
        false,
    );

    return {
        placeId,
        gameInstanceId,
        launchData,
        gameThumbnail,
        gameName,
        gameDescription,
        players,
    };
};
