import { version } from "../../../package.json";

export async function fetchServerData(placeId: string, gameInstanceId: string) {
    try {
        const valraResponse = await fetch(
            `https://apis.rovalra.com/v1/server_details?place_id=${placeId}&server_ids=${gameInstanceId}`,
            {
                method: "GET",
                headers: { "User-Agent": `FishstrapWeb/${version}` },
            },
        );

        if (!valraResponse.ok) throw new Error("valra your api sucks");

        const valraData = await valraResponse.json();
        return valraData;
    } catch (error) {
        console.error(error);
    }
}
