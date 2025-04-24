<!-- @format -->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { createASCIIVideoBackground } from "../util/createASCIIVideoBackground";

    export let videoPath: string = "";
    export let zoom: number = 1.0;

    let container: HTMLDivElement;
    let background: {
        start: () => Promise<void>;
        destroy: () => void;
        setZoom: (value: number) => void;
    };

    $: if (background && zoom) {
        background.setZoom(zoom);
    }

    onMount(() => {
        background = createASCIIVideoBackground(container, videoPath);
        background.start();
    });

    onDestroy(() => {
        if (background) {
            background.destroy();
        }
    });
</script>
<div
    bind:this={container}
    class="ascii-video-container fixed top-0 left-0 w-full h-full -z-10">
</div>
<style>
    .ascii-video-container {
        overflow: hidden;
    }
</style>
