<script lang="ts">
    import { fly } from "svelte/transition";

    export let src;
    export let css = "";
    export let alt = "Image";

    function preload(src) {
        return new Promise(function (resolve) {
            let img = new Image();
            img.onload = resolve;
            img.src = src;
        });
    }
</script>

{#await preload(src) then _}
    <img src={src} class={css} alt={alt} in:fly={{ y: -50, duration: 600 }} />
{/await}
