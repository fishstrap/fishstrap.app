/** @format */

import type { PageServerLoad } from "./$types";
import Cloudflare from "cloudflare";
import { config } from 'dotenv';

config();

const NAMESPACE_ID = process.env.NAMESPACE_ID;
const ACCOUNT_ID = process.env.ACCOUNT_ID;

const client = new Cloudflare({
    apiToken: process.env.API_TOKEN,
});

export const load: PageServerLoad = async () => {
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
