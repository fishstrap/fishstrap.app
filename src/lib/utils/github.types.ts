/** @format */
export interface ArtifactResponse {
    total_count: number;
    artifacts: Artifact[];
}

export interface Artifact {
    id: number;
    node_id: string;
    name: string;
    size_in_bytes: number;
    url: string;
    archive_download_url: string;
    expired: boolean;
    digest: string;
    created_at: string;
    updated_at: string;
    expires_at: string;
}

export interface WorkflowRuns {
    total_count: number;
    workflow_runs: WorkflowRun[];
}

export interface WorkflowRun {
    head_branch: string;
    head_sha: string;
    display_title: string;
    artifacts_url: string;
}

export enum HTTPCodes {
    OK = 200,
    BadRequest = 400,
    NotFound = 404,
    ServerError = 500
}