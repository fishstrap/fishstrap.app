/** @format */
export interface ActionsResponse {
    total_count: number;
    artifacts: ArtifactResponse[];
}

export interface ArtifactResponse {
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
    workflow_run: WorkflowRun;
}

export interface WorkflowRun {
    id: number;
    repository_id: number;
    head_repository_id: number;
    head_branch: string;
    head_sha: string;
}
