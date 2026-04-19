<!-- @format -->
<script>
    import Titlebar from "$lib/component/Titlebar.svelte";

    let { children } = $props();

    import "../lib/css/button.css";
    import "../app.css";

    const tagName = "v3.0.4";
    const downloadUrl =
        "https://github.com/fishstrap/fishstrap/releases/latest/download/Fishstrap.exe";
</script>

<Titlebar {downloadUrl} {tagName} />
{@render children()}
