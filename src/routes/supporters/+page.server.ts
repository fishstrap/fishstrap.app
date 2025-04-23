/** @format */

import type { PageServerLoad } from "./$types";
import Cloudflare from "cloudflare";

export const load: PageServerLoad = async () => {
    //why are these not being loaded as env variables???
    //because cloudflare fucking sucks.
    const NAMESPACE_ID = "816c131a55574ae28ec62a8d523f5594"
    const ACCOUNT_ID = "30eefef7e7918544a7f40f65e3a23077";

    const client = new Cloudflare({
        apiToken: "b2oQ1uEjxeKtEHDWHwnjbbu0o241l8zAfSodvnDn",
    });
    // create empty arrays
    let usernames: string[] = [];
    let rawTransactionData: Array<any> = [];

    const allUsernames: string[] = [];
    const allTimestamps: string[] = [];
    const allTypes: string[] = [];
    const allAmounts: string[] = [];
    const allCurrencies: string[] = [];

    // get all users
    for await (const key of client.kv.namespaces.keys.list(NAMESPACE_ID, { account_id: ACCOUNT_ID })) {
        usernames.push(key.name);
    }

    // go through all the usernames and fetch the key values
    for (const username of usernames) {
        try {
            const response = await client.kv.namespaces.values.get(NAMESPACE_ID, username, { account_id: ACCOUNT_ID });
            const value = await response.json();
            rawTransactionData.push({ username: username, value: value });
        } catch (error) {
            console.error(`Error fetching value for user ${username}:`, error);
        }
    }

    // process data (this fucking sucks honestly)
    rawTransactionData.forEach((item) => {
        const username = item.username;
        for (const timestamp in item.value) {
            if (item.value.hasOwnProperty(timestamp)) {
                const details = item.value[timestamp];
                allUsernames.push(username);
                allTimestamps.push(timestamp);
                allTypes.push(
                    details.subscription ? "Subscription" : "One-time",
                );
                allAmounts.push(details.amount);
                allCurrencies.push(details.currency);
            }
        }
    });

    return {
        usernames: allUsernames,
        timestamps: allTimestamps,
        types: allTypes,
        amounts: allAmounts,
        currencies: allCurrencies,
    };
};
