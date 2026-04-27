import {
    HTTPCodes,
    type Artifact,
    type ArtifactResponse,
    type WorkflowRun,
} from "$lib/utils/github.types.js";

import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { version } from "../../../package.json";
import crypto from "crypto";

const PAT = env.GITHUB_PAT;
const WEBHOOK_SECRET = env.GITHUB_WEBHOOK_SECRET;

const defaultHeaders: { [header: string]: string } = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${PAT}`,
    "User-Agent": `FishstrapWeb/${version}`,
};

export async function POST({ request }) {
    const rawBody = await request.text();

    const rawPayload = JSON.parse(rawBody);
    const payload = JSON.parse(rawPayload.payload);

    const signature = request.headers.get("x-hub-signature-256");

    if (!verifySignature(signature, rawBody, WEBHOOK_SECRET))
        if (payload.action === "completed" && payload.workflow_run) {
            const run: WorkflowRun = payload.workflow_run;

            if (run.name === "CI (Release)" || run.name === "CI (Debug)") {
                const artifacts = await fetchArtifactUrls(run);

                if (artifacts)
                    console.log("new artifacts generated:", artifacts);

                // TODO: store said data in a Artifacts.json file with the following data format
                // {
                //     Release: {
                //         main: [],
                //         canary_downloader: [],
                //         window_manipulation: []
                //     },
                //     Debug: {
                //         main: [],
                //         canary_downloader: [],
                //         window_manipulation: []
                //     }
                // }
                //
                // the channel arrays will store the the artifact objects
                return json({ message: "workflow processed successfully" });
            }
        }
    return json({ message: "event skipped..." });
}

function verifySignature(
    signature: string | null,
    body: string,
    secret: string | undefined,
): boolean {
    if (!signature || !secret) return false;

    const hmac = crypto.createHmac("sha256", secret);
    const digest = "sha256=" + hmac.update(body).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

async function fetchArtifactUrls(
    workflow: WorkflowRun,
): Promise<object[] | null> {
    let response: object[] = [];

    const runResponse = await fetch(workflow.url, { headers: defaultHeaders });

    if (!runResponse.ok) {
        console.error(
            `artifact API responded with status: ${runResponse.status}`,
        );
        return null;
    }

    const runData = await runResponse.json();

    if (!runData.artifacts_url) return null;

    const artifactResponse = await fetch(runData.artifacts_url, {
        headers: defaultHeaders,
    });

    const artifactData = (await artifactResponse.json()) as ArtifactResponse;

    const branch: string = workflow.head_branch;
    const sha: string = workflow.head_sha;
    const archive_download_url: string =
        artifactData.artifacts?.[0].archive_download_url;

    response.push({
        job: workflow.name,
        branch: branch,
        hash: sha,
        archive_download_url: archive_download_url,
        message: workflow.display_title,
    });

    return response.length > 0 ? response : null;
}
