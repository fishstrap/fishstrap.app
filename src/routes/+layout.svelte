<script lang="ts">
    import Titlebar from "$lib/components/ui/Titlebar.svelte";
    import Background from "$lib/components/ui/Background.svelte";
    import { ModeWatcher } from "mode-watcher";

    let { children } = $props();

    import "../lib/css/button.css";
    import "../app.css";

    const tagName = "v3.0.4";
    const downloadUrl =
        "https://github.com/fishstrap/fishstrap/releases/latest/download/Fishstrap.exe";
</script>

<Background />

<div class="bg-(--background)">
    <Titlebar {downloadUrl} {tagName} />
    {@render children()}
</div>
<ModeWatcher />
