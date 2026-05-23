<script lang="ts">
    import Titlebar from "$lib/components/ui/Titlebar.svelte";
    import { ModeWatcher } from "mode-watcher";

    let { children } = $props();

    import "../lib/css/button.css";
    import "../app.css";

    const tagName = "v3.0.4";

    // never changes
    const downloadUrl =
        "https://github.com/fishstrap/fishstrap/releases/latest/download/Fishstrap.exe";
</script>

<div class="bg-(--background)">
    <Titlebar {downloadUrl} {tagName} />
    {@render children()}
</div>
<ModeWatcher />
