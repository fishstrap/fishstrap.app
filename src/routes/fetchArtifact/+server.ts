/** @format */
import { HTTPCodes, type ArtifactResponse, type WorkflowRun, type WorkflowRuns } from "$lib/utils/github.types.js";

import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { version } from "../../../package.json";

const PAT = env.GITHUB_PAT;
const repo = "fishstrap/fishstrap";

const defaultHeaders: { [header: string]: string } = {
    "Accept": "application/vnd.github+json",
    "Authorization": `Bearer ${PAT}`,
    "User-Agent": `FishstrapWeb/${version}`
}

export async function GET({ url }) {
    const workflow: string = url.searchParams.get("workflow");
    const amount: string = url.searchParams.get("amount");

    if (+amount > 10) {
        return json({
            "statusCode": HTTPCodes.BadRequest,
            "message": "amount cannot be more than 10"
        })
    }
    
    if (amount == null || +amount <= 0) {
        return json({
            "statusCode": HTTPCodes.BadRequest,
            "message": "amount cannot be null or below 0"
        })
    }
    
    let artifacts: object[];
    
    if (workflow == "Release") {
        const workflowRuns = await fetchRuns("ci-release.yml", amount);
        artifacts = await fetchArtifactUrls(workflowRuns);
    }
    
    if (workflow == "Debug") {
        const workflowRuns = await fetchRuns("ci-debug.yml", amount);
        artifacts = await fetchArtifactUrls(workflowRuns);
    }
    
    if (artifacts == null) {
        return json({
            "statusCode": HTTPCodes.ServerError,
            "message": "an internal server error has occured"
        })
    }
    
    return json(artifacts);
}

async function fetchRuns(id: string, amount: string): Promise<WorkflowRuns | null> {
    const workflowResponse = await fetch(`https://api.github.com/repos/${repo}/actions/workflows/${id}/runs?per_page=${amount}&event=push`, {
        headers: defaultHeaders
    });
    
    if (!workflowResponse.ok)
        throw new Error(`api responded with status: ${workflowResponse.status}`);
    
    const workflowData = await workflowResponse.json() as WorkflowRuns;
    
    return workflowData;
}

async function fetchArtifactUrls(workflows: WorkflowRuns): Promise<object[] | null> {
    let response: object[] = [];
    
    for (const workflow of workflows.workflow_runs) {
        const artifactResponse = await fetch(workflow.artifacts_url, {
            headers: defaultHeaders
        });
        
        if (!artifactResponse.ok) {
            console.error(`api responded with status: ${artifactResponse.status}`);
            continue;
        }
        
        const artifactData = await artifactResponse.json() as ArtifactResponse;
        
        if (!artifactData.artifacts)
            continue;
        
        const assetResponse = await fetch(artifactData.artifacts?.[0].archive_download_url, {
            headers: defaultHeaders,
            redirect: "manual"
        });
        
        if (assetResponse.status === 302) {
            let branch: string = workflow.head_branch;
            let sha: string = workflow.head_sha;
            let downloadUrl: string = assetResponse.headers.get("location");
            
            if (downloadUrl)
                response.push({ [sha]: { branch: branch, url: downloadUrl, message: workflow.display_title } });
        } else {
            console.error(`api responded with status: ${assetResponse.status}`);
            continue;
        }
    }
    
    return response.length > 0 ? response : null;
}