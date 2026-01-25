/** @format */

import type { PageServerLoad } from "./$types";
import { fetchGameData, fetchThumbnailData } from "$lib/utils/roblox";
import type { GameData } from "$lib/utils/roblox.types";

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
    
    const gameData = await fetchGameData(placeId) as GameData;
    const gameName: string = gameData.name;
    const gameDescription: string = gameData.description;
    
    const formatter = new Intl.NumberFormat("en-US", { notation: "compact" });
    const players: string = (gameData.playing != null && !isNaN(gameData.playing)) ? formatter.format(gameData.playing) : "Unknown";
    
    const gameThumbnail: string = await fetchThumbnailData(placeId, "GameThumbnail", "384x216", false);

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
