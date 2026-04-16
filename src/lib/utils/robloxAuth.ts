/** @format */

import { env } from "$env/dynamic/private";

export function selectNextCookie(): string {
    const cookies: string[] = JSON.parse(env.ROBLOXCOOKIES || "[]");
    if (cookies.length === 0) throw new Error("Cookie pool is empty");

    const index = Math.floor(Math.random() * cookies.length);
    const selectedCookie: string | undefined = cookies[index];
    if (typeof selectedCookie == "undefined")
        throw new Error("Failed to select a cookie at " + index);

    return selectedCookie;
}
