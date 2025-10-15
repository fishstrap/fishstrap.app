import { type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, platform }) => {
	const placeId = url.searchParams.get("placeId")
	const gameInstanceId = url.searchParams.get("gameInstanceId")
	// const userId = url.searchParams.get("userId");

	if (!placeId) {
		return new Response("Missing placeId parameter", { status: 400 })
	}

	try {
		// wont be used until we get oauth running (NEVER HAPPENING)
		// const userData = await fetchUserData(userId);
		// const avatarThumbnail = await fetchThumbnailData(userId, "AvatarHeadshot", "150x150", true);

		const gameData = await fetchGameData(placeId);
		const gameThumbnail = await fetchThumbnailData(placeId, "GameThumbnail", "768x432", false);
		const serverData = await fetchServerData(placeId, gameInstanceId)

		const image = await svg2png(
			await generateSVGImage(gameData, placeId, gameInstanceId, gameThumbnail, serverData)
		);

		return new Response(image as any, {
			headers: {
				"Content-Type": "image/png",
				"Cache-Control": "public, max-age=300",
				"Content-Disposition": "inline; filename='output.png'"
			}
		});
	} catch (error) {
		console.error(error)

		// const fallbackSvg = generateFallbackSVG(placeId, gameInstanceId)
		// const fallbackBuffer = await svgToPng(fallbackSvg)

		// return new Response(fallbackBuffer, {
		// 	headers: {
		// 		"Content-Type": "image/png",
		// 		"Cache-Control": "public, max-age=300"
		// 	}
		// })
	}
}

async function svg2png(svg) {
	try {
		const pngResponse = await fetch(
			"https://gcrazydude.xyz/convert", {
			method: "POST",
			headers: {
				"Content-Type": "image/svg+xml"
			},
			body: svg
		}
		);

		if (!pngResponse.ok) throw new Error("failed to fetch png");

		return pngResponse.arrayBuffer();
	} catch (error) {
		console.error(error);
	}
}

async function fetchServerData(placeId: string, gameInstanceId: string) {
	try {
		const valraResponse = await fetch(
			`https://apis.rovalra.com/v1/server_details?place_id=${placeId}&server_ids=${gameInstanceId}`,
			{
				method: "GET"
			}
		)

		if (!valraResponse.ok) throw new Error("valra your api sucks");

		const valraData = await valraResponse.json();
		if (valraData.servers == null && valraData.servers == "") throw new Error("error: api returned empty data")
		return valraData;
	} catch (error) {
		console.error(error);
	}
}

async function fetchThumbnailData(id: string, type: string, size: string, isCircular: boolean) {
	const data = [
		{
			"requestId": Math.random().toString(36).substring(2, 15), // generate a random request ID
			"targetId": id,
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
				body: JSON.stringify(data)
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

// async function fetchUserData(userId: string) {
// 	try {
// 		const userResponse = await fetch(
// 			`https://users.roblox.com/v1/users/${userId}`,
// 			{
// 				headers: {
// 					"User-Agent": "Mozilla/5.0 (compatible; OGImageBot/1.0)"
// 				}
// 			}
// 		)

// 		if (!userResponse.ok) throw new Error("failed to fetch user data")

// 		const userData = await userResponse.json();
// 		return userData;
// 	} catch (error) {
// 		console.error("Error fetching game data:", error)
// 		return null
// 	}
// }

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

		if (!universeResponse.ok) throw new Error("failed to fetch universe");

		const universeData = await universeResponse.json();
		const universeId = universeData.universeId;

		const gameResponse = await fetch(
			`https://games.roblox.com/v1/games?universeIds=${universeId}`,
			{
				headers: {
					"User-Agent": "Mozilla/5.0 (compatible)"
				}
			}
		)

		if (!gameResponse.ok) throw new Error("failed to fetch game data");

		const gameData = await gameResponse.json()
		return gameData.data?.[0] || null
	} catch (error) {
		console.error("error fetching game data:", error)
		return null
	}
}

async function urlToBase64(url: string | null): Promise<string> {
	if (!url) {
		return "";
	}

	try {
		const response = await fetch(url);
		if (!response.ok) {
			console.error(`http error status: ${response.status}`);
			return "";
		}

		const arrayBuffer = await response.arrayBuffer();

		const base64String = Buffer.from(arrayBuffer).toString("base64");

		const contentType = response.headers.get("content-type") || "image/png";
		return `data:${contentType};base64,${base64String}`;

	} catch (error) {
		console.error("error converting url to base64:", error);
		return "";
	}
}

async function generateSVGImage(gameData: any, placeId: string, gameInstanceId: string | null, gameThumbnail: string | null, serverData: any) {
	// const gameName = gameData?.name || "Roblox";
	// const gameDescription = gameData?.description || "A roblox experience.";
	const numberFormatter = new Intl.NumberFormat("en-US", {
		notation: "compact",
		compactDisplay: "short"
	});

	const timestamp = new Date(serverData.servers?.[0].first_seen ?? new Date());
	const now = new Date();
	const diff = now.getTime() - timestamp.getTime();

	const serverUptime = (diff / 3600000).toFixed(2);
	const serverRegionCode = serverData.servers?.[0]?.region_code ?? "???";
	const serverCity = serverData.servers?.[0].city ?? "???";
	const serverCountry = serverData.servers?.[0].country ?? "???";

	// there might be a chance that the region and the country might be the same, but I DO NOT CARE
	const serverLocation = `${serverCity}, ${serverCountry}, ${serverRegionCode}`;
	const playerCount = gameData?.playing ?? 0;
	const formattedPlayerCount = numberFormatter.format(playerCount);
	// const username = userData?.name || "your Friend";
	const base64GameThumbnail = await urlToBase64(gameThumbnail);
	// const base64AvatarThumbnail = await urlToBase64(avatarThumbnail);

	return `
    <svg width="768" height="432" viewBox="0 0 768 432" fill="none" xmlns="http://www.w3.org/2000/svg">
	  <image href="${base64GameThumbnail}" x="0" y="0" width="768" height="432" />
	  <rect x="0" y="0" width="768" height="432" fill="black" opacity="0.6" />
      <defs>
        <path id="path_1" d="M768 0L768 0L768 432L0 432L0 0L768 0Z" />
        <pattern id="pattern_3" width="2" height="2">
          <use p4:href="#image_2" xmlns:p4="http://www.w3.org/1999/xlink" />
        </pattern>
        <radialGradient id="gradient_4" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="matrix(0 -317.482 529.612 0 384 216)">
          <stop offset="0" stop-color="#000000" stop-opacity="0.169" />
          <stop offset="1" stop-color="#000000" stop-opacity="0.78" />
        </radialGradient>
        <clipPath id="clip_path_5">
          <rect width="450" height="75" rx="6" />
        </clipPath>
        <path id="path_6" d="M0 64C0 28.6538 28.6538 0 64 0C99.3462 0 128 28.6538 128 64C128 99.3462 99.3462 128 64 128C28.6538 128 0 99.3462 0 64Z" />
        <pattern id="pattern_8" patternTransform="scale(0.853 0.853)" width="2.172" height="2.172">
          <use p4:href="#image_7" xmlns:p4="http://www.w3.org/1999/xlink" />
        </pattern>
        <clipPath id="clip_path_9">
          <rect width="578" height="51" />
        </clipPath>
      </defs>
      <g>
        <use p3:href="#path_1" fill="url(#pattern_3)" fill-rule="evenodd" xmlns:p3="http://www.w3.org/1999/xlink" />
        <use p3:href="#path_1" fill="url(#gradient_4)" fill-rule="evenodd" xmlns:p3="http://www.w3.org/1999/xlink" />
        <g clip-path="url(#clip_path_5)" transform="translate(12 345)">
          <rect width="450" height="75" fill="#000000" fill-rule="evenodd" fill-opacity="1" />
          <text transform="translate(14 30)" dominant-baseline="middle" font-family="Inter" font-weight="700" font-size="18" fill="#FFFFFF" >Server location: </text>
          <text transform="translate(160 30)" dominant-baseline="middle" font-family="Inter" font-weight="700" font-size="18" fill="#6FF527" >${serverLocation}</text>
          <text transform="translate(14 55)" font-family="Inter" dominant-baseline="middle" font-weight="700" font-size="18" fill="#FFFFFF" >Uptime: </text>
          <text transform="translate(90 55)" font-family="Inter" dominant-baseline="middle" font-weight="700" font-size="18" fill="#E5FF00" >${serverUptime} Hours</text>
          <text transform="translate(245 55)" font-family="Inter" dominant-baseline="middle" font-weight="700" font-size="18" fill="#FFFFFF" >Player Count: </text>
          <text transform="translate(320 55)" font-family="Inter" dominant-baseline="middle" font-weight="700" font-size="18" fill="#E07C19" >${formattedPlayerCount || "???"}</text>
        </g>
        <path d="M768 432L768 0L0 0L0 432L768 432ZM1 431L1 1L767 1L767 431L1 431Z" fill="#808080" fill-rule="evenodd" />
      </g>
	</svg>
  `
}

function escapeXML(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/"/g, "&apos;")
}

async function returnSvg(svg: string) {
	return new TextEncoder().encode(svg).buffer;
};