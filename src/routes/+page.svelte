<!-- @format -->
<script>
    import device from "svelte-device-info";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    import BackgroundTile from "../component/BackgroundTile.svelte";
    import Link from "../component/Link.svelte";

    let logo = "img/Logo.png";
    let showcase = "img/Showcase.png";

    let showBackground = true;
    let onReady = false;
    let stars = null;
    let totalDownloads = null;

    const fetchData = async () => {
        const repoData = await fetch(
            `https://api.github.com/repos/returnrqt/fishstrap`,
        ).then((res) => res.json());
        stars = repoData.stargazers_count;

        const releasesData = await fetch(
            `https://api.github.com/repos/returnrqt/fishstrap/releases`,
        ).then((res) => res.json());
        totalDownloads = releasesData.reduce(
            (sum, release) =>
                sum +
                release.assets.reduce(
                    (s, asset) => s + asset.download_count,
                    0,
                ),
            0,
        );
    };

    onMount(() => {
        onReady = true;
        if (device.isTablet || device.isPhone || device.IsMobile) {
            console.log("mobile");
            showBackground = false;
        }

        fetchData();
    });
</script>

<svelte:head>
    <title>| &nbsp;&nbsp;Home</title>
</svelte:head>

{#if onReady}
    <div
        in:fly={{ y: -50, duration: 600 }}
        class="m-4 sm:m-8 md:m-12 text-white justify-center items-center pointer-events-none overflow-hidden flex flex-col w-auto z-100">
        <img
            class="max-w-[80%] sm:max-w-[70%] md:max-w-[60%] xl:max-w-[50%] 2xl:max-w-[30%] h-auto z-100 mb-12"
            src={logo}
            alt="logo" />

        <p
            class="text-md text-center font-medium text-md sm:text-xl md:text-xl pointer-events-none z-100 sm:text-left">
            Fishstrap is a Bloxstrap fork aiming to enhance some of the
            features.
            <br />
            <br />
            Found any bugs? Submit an <Link
                content="issue"
                href="https://github.com/returnrqt/fishstrap/issues" />
            <br />
            Want some mods? Join our <Link
                content="Discord Server"
                href="https://discord.gg/dZJSbgHx8y" />
            <br />
        </p>

        <br />

        <!--thank you Francois for the button!-->
        <div class="wrapper pointer-events-auto mt-12">
            <a id="downloadbutton" href="/download" class="c-btn">
                <span class="c-btn__label">
                    Download &nbsp; | <svg
                        width="24"
                        height="24"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd">
                        </path>
                    </svg>
                </span>
            </a>
        </div>

        <div
            class="text-transparent bg-clip-text text-center bg-gradient-to-r from-astronaut-blue-300 to-astronaut-blue-600">
            <p class="text-md opacity-100 mt-2">
                Downloads: {totalDownloads} Stars: {stars}
            </p>
        </div>

        <div class="mt-8">
            <p class="text-sm align-bottom opacity-75">
                View the repository on <Link
                    content="Github"
                    href="https://github.com/returnrqt/fishstrap" />
            </p>
        </div>
    </div>
{/if}
{#if showBackground}
    <BackgroundTile />
{/if}
