/** @format */

import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import type { ActionsResponse } from "$lib/utils/github.types.ts"

export async function GET({ url }) {
    const PAT = env.GITHUB_PAT;
    const repo = "fishstrap/fishstrap";
    
    const actionsResponse = await fetch(`https://api.github.com/repos/${repo}/actions/artifacts?per_page=1`, {
        method: "GET",
        headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": `Bearer ${PAT}`,
            "User-Agent": "FishstrapArtifactFetcher"
        }
    })
    
    if (!actionsResponse.ok) {
        throw new Error(`api responsed with status: ${actionsResponse.status}`)
    }
    
    const actionsData = await actionsResponse.json() as ActionsResponse;
    
    if (actionsData.artifacts == null)
        throw new Error("no artifacts found");
    
    const artifactResponse = await fetch(actionsData.artifacts?.[0].archive_download_url, {
        headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": `Bearer ${PAT}`,
            "User-Agent": "FishstrapArtifactFetcher"
        },
        redirect: "manual"
    })
    
    if (artifactResponse.status === 302) {
        const downloadUrl = artifactResponse.headers.get("location");
        const response = {
            url: downloadUrl,
            branch: actionsData.artifacts?.[0].workflow_run.head_branch,
            commit: actionsData.artifacts?.[0].workflow_run.head_sha
        };
        
        return json(response);
    } else {
        throw new Error(`failed to get artifact.`)
    }
}