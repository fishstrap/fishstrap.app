<!-- @format -->
<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import device from "svelte-device-info";

    import GradientText from "$lib/component/GradientText.svelte";
    import Titlebar from "$lib/component/Titlebar.svelte";
    import Link from "$lib/component/Link.svelte";
    import Image from "$lib/component/Image.svelte";

    let onReady = $state(false);
    let stars = $state(null);
    let totalDownloads = $state(null);
    let downloadUrl = $state(null);
    let tagName = $state(null);
    let copied = $state(false);

    let showBackground = true;
    const mobile = device.isMobile || device.isTablet || device.isPhone;

    function copyToClipboard() {
        navigator.clipboard.writeText("winget install Fishstrap.Fishstrap");
        copied = true;
        setTimeout(() => {
            copied = false;
        }, 2000);
    }

    onMount(async () => {
        onReady = true;
        
        // hardcoded for now
        downloadUrl = "https://github.com/fishstrap/fishstrap/releases/download/latest/Fishstrap.exe";
        tagName = "v3.0.1.0";
    });
</script>

<svelte:head>
    <meta property="og:title" content="Fishstrap" />
    <meta
        property="og:description"
        content="Fishstrap is an alternative to the default roblox bootstrapper, based on Bloxstrap." />
    <meta
        property="og:image"
        content="https://github.com/fishstrap/fishstrap/blob/main/Images/Showcase.webp?raw=true" />
    <meta property="og:type" content="website" />
    <title>| &nbsp;&nbsp;Home</title>
</svelte:head>

<div
    class="font-['Inter_Variable'] transition-all min-h-screen w-full bg-black relative">
    <Titlebar {downloadUrl} {tagName} />

    {#if onReady}
        <main
            in:fly={{ y: -50, duration: 600 }}
            class="text-white relative z-10 flex flex-col w-full pointer-events-none">
            <section
                class="min-h-[calc(100vh-6rem)] mt-24 flex flex-col lg:flex-row items-center justify-center w-full max-w-[90rem] 2xl:max-w-[120rem] mx-auto pointer-events-none px-4 sm:px-6 lg:px-8 gap-8 lg:gap-16 2xl:gap-32">
                <div
                    class="w-full lg:w-1/2 pointer-events-none flex flex-col items-center lg:items-start text-center lg:text-left">
                    <Image
                        delay={0}
                        divclass="w-3/4 sm:w-1/2 lg:w-3/4 2xl:w-full pointer-events-none h-auto z-100 mb-8 lg:mb-12 2xl:mb-16"
                        src="img/Logo.webp" />
                    <p
                        class="font-medium text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl pointer-events-none z-100 max-w-2xl lg:max-w-none leading-relaxed">
                        Fishstrap is an alternative to the normal Roblox
                        bootstrapper, with tons of features that cannot be found in the regular app.
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
                        <a id="downloadbutton" href={downloadUrl} class="c-btn">
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
                    <span class="font-bold text-md text-white/50">
                        Or, Install from Winget:
                    </span>
                    <div
                        class="pointer-events-auto mt-4 font-[consolas] border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl transition-all duration-300 text-xs sm:text-base md:text-lg 2xl:text-xl p-2 2xl:p-4 rounded-lg w-fit max-w-full self-center lg:self-start flex items-center gap-3 sm:gap-4">
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
                        delay={0}
                        divclass="max-w-full h-auto drop-shadow-2xl"
                        src="img/Showcase.webp" />
                </div>
            </section>
        </main>
    {/if}

    <div class="tile-grid fixed inset-0 z-0">
        {#each Array(550) as _, i}
            <div
                class="tile border border-white/25 transition-colors duration-500 ease-out hover:duration-0 hover:-translate-x-1 hover:-translate-y-1
                hover:nth-[2n]:bg-astronaut-blue-300
                hover:nth-[4n+1]:bg-astronaut-blue-800
                hover:nth-[4n+3]:bg-astronaut-blue-950
                hover:nth-[7n]:bg-astronaut-blue-700
                hover:nth-[7n+3]:bg-astronaut-blue-600
                hover:nth-[7n+5]:bg-astronaut-blue-900
                hover:nth-[7n+6]:bg-astronaut-blue-500
                hover:nth-[11n+1]:bg-astronaut-blue-200
                hover:nth-[11n+4]:bg-astronaut-blue-600
                hover:nth-[11n+7]:bg-astronaut-blue-950
                hover:nth-[11n+10]:bg-astronaut-blue-100
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
            grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
            grid-template-rows: repeat(auto-fill, minmax(90px, 1fr));
        }
    }

    @media (min-width: 2560px) {
        .tile-grid {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            grid-template-rows: repeat(auto-fill, minmax(120px, 1fr));
        }
    }

    @media (min-width: 3060px) {
        .tile-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            grid-template-rows: repeat(auto-fill, minmax(240px, 1fr));
        }
    }
</style>
