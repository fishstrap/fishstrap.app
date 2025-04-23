<!-- @format -->
<script lang="ts">
    import { blur } from "svelte/transition";
    import { onMount } from "svelte";
    import { bounceInOut } from "svelte/easing";

    interface Props {
        src: string;
        alt?: string;
        loading?: "lazy" | "eager";
        divclass?: string;
        imgclass?: string;
        delay?: number;
        width: string | number | undefined;
        height: string | number | undefined;
    }

    let {
        src,
        alt = "",
        loading = "lazy",
        divclass = "",
        imgclass = "",
        delay = 0,
        width,
        height,
    }: Props = $props();

    let isLoaded = false;
    let imgWidth: string | number | undefined = $state();
    let imgHeight: string | number | undefined = $state();

    // Function to get image dimensions
    function getImageDimensions(
        source: string,
    ): Promise<{ width: number; height: number }> {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };
            img.onerror = () => {
                resolve({ width: 0, height: 0 }); // Resolve with 0,0 on error to prevent blocking
            };
            img.src = source;
        });
    }

    // Modified preload function to simulate latency
    async function preload(src: string, delay: number): Promise<void> {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                const img = new Image();
                img.onload = () => {
                    isLoaded = true;
                    resolve();
                };
                img.onerror = () => resolve();
                img.src = src;
            }, delay);
        });
    }

    async function initializeDimensions() {
        if (width) {
            imgWidth = width;
        }
        if (height) {
            imgHeight = height;
        }
        if (!width || !height) {
            try {
                const dimensions = await getImageDimensions(src);
                imgWidth = dimensions.width;
                imgHeight = dimensions.height;
            } catch (error) {
                console.error("Failed to get image dimensions", error);
                imgWidth = undefined;
                imgHeight = undefined;
            }
        }
    }

    onMount(async () => {
        await initializeDimensions();
    });
</script>

<div style:width={imgWidth} style:height={imgHeight} class={divclass}>
    {#await preload(src, delay) then _}
        <img
            {src}
            {alt}
            {loading}
            style:width="100%"
            style:height="100%"
            class="w-full h-full {imgclass}"
            transition:blur={{ duration: 500, easing: bounceInOut }} />
    {:catch error}
        <div>Error loading image: {error?.message}</div>
    {/await}
</div>
