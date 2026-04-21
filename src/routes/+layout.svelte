<!-- @format -->
<script>
    import Titlebar from "$lib/component/Titlebar.svelte";
    import Background from "$lib/component/Background.svelte";

    let { children } = $props();

    import "../lib/css/button.css";
    import "../app.css";

    const tagName = "v3.0.4";
    const downloadUrl =
        "https://github.com/fishstrap/fishstrap/releases/latest/download/Fishstrap.exe";
</script>

<Background />
<div class="transition-all bg-black">
    <Titlebar {downloadUrl} {tagName} />
    {@render children()}
</div>
