<script lang="ts">
    import Titlebar from "$lib/components/ui/Titlebar.svelte";
    import Background from "$lib/components/ui/Background.svelte";
    import { ModeWatcher } from "mode-watcher";

    let { children } = $props();

    import "../lib/css/button.css";
    import "../app.css";

    const tagName = "v3.0.4";

    // never changes
    const downloadUrl =
        "https://github.com/fishstrap/fishstrap/releases/latest/download/Fishstrap.exe";
</script>

<Background />

<div class="bg-(--background)">
    <Titlebar {downloadUrl} {tagName} />
    {@render children()}
</div>
<ModeWatcher />

<style>
    :global(html) {
        scrollbar-color: #27272a #09090b;
    }
    :global(::-webkit-scrollbar) {
        width: 8px;
        background-color: #09090b;
    }

    :global(::-webkit-scrollbar-thumb) {
        background-color: #27272a;
        border-radius: 9999px;
    }

    :global(::-webkit-scrollbar-thumb:hover) {
        background-color: #3f3f46;
    }
</style>
