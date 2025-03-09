<!-- @format -->
<script>
    import { onMount } from "svelte";
    import device from "svelte-device-info";
    import { fly } from "svelte/transition";


    import BackgroundTile from "../../component/BackgroundTile.svelte";

    let showBackground = true;
    let userdevice = device.isTablet || device.isPhone || device.isMobile;

    async function downloadLatest() { 
        try {
            const response = await fetch(
                `https://api.github.com/repos/returnrqt/fishstrap/releases/latest`,
            );
            const data = await response.json();

            if (response.ok) {
                const downloadLinks = data.assets.map(
                    (asset) => asset.browser_download_url,
                );

                if (downloadLinks.length > 0) {
                    window.location.href = downloadLinks[0];
                } else {
                    console.error("Error fetching release data:", data.message);
                }
            }
        } catch (error) {
            console.error("erm how: ", error);
        }
    }

    onMount(() => {
        if (userdevice) {
            showBackground = false;
            window.location.href = "https://github.com/returnrqt/fishstrap";
            return;
        }

        if (!userdevice) 
            downloadLatest();
    });
</script>

<svelte:head>
    <title>| &nbsp;&nbsp;Download</title>
</svelte:head>

<div in:fly={{ y: -50, duration: 600}}
    class="justify-center items-center flex pointer-events-none flex-col z-100">
    <div
        class="text-transparent bg-clip-text text-center bg-gradient-to-r from-astronaut-blue-300 to-astronaut-blue-600">
        <h1 class="text-3xl mb-4 drop-shadow-md">
            Thank you for downloading Fishstrap!
        </h1>
        <p class="text-sm opacity-75 mb-12">
            Your download should begin soon...
        </p>
    </div>
    <div
        class="animate-bounce rounded-4xl border-2 border-white/15 bg-[#1b1f29] p-2 m-2">
        <svg
            width="36"
            height="36"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                fill="#42b2ee"
                fill-rule="evenodd"
                clip-rule="evenodd">
            </path>
        </svg>
    </div>
</div>

{#if showBackground}
    <BackgroundTile />
{/if}
