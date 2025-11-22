<!-- @format -->
<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import device from "svelte-device-info";

    import GradientText from "../component/GradientText.svelte";
    import Titlebar from "../component/Titlebar.svelte";
    import Link from "../component/Link.svelte";
    import Image from "../component/Image.svelte";

    let onReady = $state(false);
    let stars = $state(null);
    let totalDownloads = $state(null);
    let copied = $state(false);

    let showBackground = true;
    const mobile = device.isMobile || device.isTablet || device.isPhone;

    async function downloadLatest() {
        if (mobile) {
            window.location.href = "https://github.com/fishstrap/fishstrap";
            return;
        }

        try {
            const response = await fetch(
                `https://api.github.com/repos/fishstrap/fishstrap/releases/latest`,
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
            window.location.href =
                "https://github.com/fishstrap/fishstrap/releases/latest";
        }
    }

    function copyToClipboard() {
        navigator.clipboard.writeText("winget install Fishstrap.Fishstrap");
        copied = true;
        setTimeout(() => {
            copied = false;
        }, 2000);
    }

    const fetchData = async () => {
        const repoData = await fetch(
            `https://api.github.com/repos/fishstrap/fishstrap`,
        ).then((res) => res.json());
        stars = repoData.stargazers_count;

        const releasesData = await fetch(
            `https://api.github.com/repos/fishstrap/fishstrap/releases`,
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
        fetchData();
    });
</script>

<svelte:head>
    <title>| &nbsp;&nbsp;Home</title>
</svelte:head>

<div
    class="font-['Inter_Variable'] transition-all min-h-screen w-full bg-black relative">
    <Titlebar {downloadLatest} />

    {#if onReady}
        <main
            in:fly={{ y: -50, duration: 600 }}
            class="text-white relative z-10 flex flex-col w-full pointer-events-none">
            <section
                class="min-h-[calc(100vh-6rem)] mt-24 flex flex-col lg:flex-row items-center justify-center w-full max-w-[90rem] 2xl:max-w-[120rem] mx-auto pointer-events-none px-4 sm:px-6 lg:px-8 gap-8 lg:gap-16 2xl:gap-32">
                <div
                    class="w-full lg:w-1/2 pointer-events-none flex flex-col items-center lg:items-start text-center lg:text-left">
                    <Image
                        delay={500}
                        divclass="w-3/4 sm:w-1/2 lg:w-3/4 2xl:w-full pointer-events-none h-auto z-100 mb-8 lg:mb-12 2xl:mb-16"
                        src="img/Logo.webp" />
                    <p
                        class="font-medium text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl pointer-events-none z-100 max-w-2xl lg:max-w-none leading-relaxed">
                        Fishstrap is an alternative to the normal Roblox
                        bootstrapper, with tons of features missing from the
                        regular app.
                        <br />
                        <br />

                        Found any bugs? Submit an <Link
                            href="https://github.com/returnrqt/fishstrap/issues">
                            issue
                        </Link>
                        <br />
                        Want some mods? Join our <Link
                            content="Discord Server"
                            href="https://discord.gg/dZJSbgHx8y">
                            server
                        </Link>
                        <br />
                    </p>

                    <!--thank you Francois for the button!-->
                    <div
                        class="flex wrapper pointer-events-auto mt-12 mb-4 justify-center items-center lg:justify-start">
                        <a
                            id="downloadbutton"
                            href=""
                            onclick={downloadLatest}
                            class="c-btn">
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
                    <span class="font-bold text-md text-white/50" >Or, Install from Winget:</span>
                    <div
                        class="pointer-events-auto mt-4 bg-black font-[consolas] border-1 border-white/10 text-xs sm:text-base md:text-lg 2xl:text-xl p-2 2xl:p-4 rounded-lg w-fit max-w-full self-center lg:self-start flex items-center gap-3 sm:gap-4">
                        <span class="whitespace-nowrap">
                            > winget install Fishstrap.Fishstrap
                        </span>
                        <button
                            onclick={copyToClipboard}
                            class="text-sm bg-white/10 hover:bg-white/20 transition-alls px-2 py-1 rounded text-white/70 hover:text-white font-[Inter_Variable]">
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>

                    <div class="mt-4 pointer-events-none">
                        <GradientText>
                            Downloads: {totalDownloads == null
                                ? "?"
                                : totalDownloads} Stars:
                            {stars == null ? "?" : stars}
                        </GradientText>
                    </div>

                    <div class="mt-4 pointer-events-none">
                        <p class="text-sm opacity-75">
                            View the repository on <Link
                                href="https://github.com/returnrqt/fishstrap">
                                Github
                            </Link>
                        </p>
                    </div>
                </div>
                <div
                    class="hidden lg:flex w-1/2 justify-center pointer-events-none">
                    <Image
                        delay={500}
                        divclass="max-w-full h-auto drop-shadow-2xl"
                        src="img/Showcase.webp" />
                </div>
            </section>
        </main>
    {/if}

    <div class="tile-grid fixed inset-0 z-0">
        {#each Array(1000) as _, i}
            <div
                class="tile border border-white/5 transition-colors duration-500 ease-out hover:duration-0 hover:-translate-x-1 hover:-translate-y-1
                {i % 2 === 1 ? 'hover:bg-astronaut-blue-300' : ''}
                {i % 4 === 1 ? 'hover:bg-astronaut-blue-800' : ''}
                {i % 4 === 3 ? 'hover:bg-astronaut-blue-950' : ''}
                {i % 7 === 0 ? 'hover:bg-astronaut-blue-700' : ''}
                {i % 7 === 3 ? 'hover:bg-astronaut-blue-600' : ''}
                {i % 7 === 5 ? 'hover:bg-astronaut-blue-900' : ''}
                {i % 7 === 6 ? 'hover:bg-astronaut-blue-500' : ''}
                {i % 11 === 1 ? 'hover:bg-astronaut-blue-200' : ''}
                {i % 11 === 4 ? 'hover:bg-astronaut-blue-600' : ''}
                {i % 11 === 7 ? 'hover:bg-astronaut-blue-950' : ''}
                {i % 11 === 10 ? 'hover:bg-astronaut-blue-100' : ''}
            ">
            </div>
        {/each}
    </div>
</div>

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
    .tile-grid {
        display: grid;
        width: 100%;
        height: 100%;
        gap: 0;
        opacity: 0.4;
    }

    .tile {
        width: 100%;
        height: 100%;
        aspect-ratio: 1;
    }

    /** kinda dont like how we have to do responsive design in tailwind so im just going
        do it this way. yes its uglier compared to tailwind but i like the verbosity a bit more **/

    @media (min-width: 300px) {
        .tile-grid {
            grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
            grid-template-rows: repeat(auto-fill, minmax(60px, 1fr));
        }
    }

    @media (min-width: 1024px) {
        .tile-grid {
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
            grid-template-rows: repeat(auto-fill, minmax(80px, 1fr));
        }
    }

    @media (min-width: 2560px) {
        .tile-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            grid-template-rows: repeat(auto-fill, minmax(150px, 1fr));
        }
    }

    @media (min-width: 3060px) {
        .tile-grid {
            grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
            grid-template-rows: repeat(auto-fill, minmax(230px, 1fr));
        }
    }
</style>
