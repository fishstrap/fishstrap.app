<!-- @format -->
<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    import Link from "$lib/components/ui/Link.svelte";
    import Image from "$lib/components/ui/Image.svelte";
    import Download from "$lib/svg/Download.svelte";
    import Star from "$lib/svg/Star.svelte";

    let onReady: boolean = $state(false);
    let copied: boolean = $state(false);
    let githubStats: GithubData | null = $state(null);

    // never changes
    const downloadUrl: string =
        "https://github.com/fishstrap/fishstrap/releases/latest/download/Fishstrap.exe";

    interface GithubData {
        stars: number;
        total_release_downloads: number;
        last_updated: string;
    }

    function copyToClipboard() {
        navigator.clipboard.writeText("winget install Fishstrap.Fishstrap");
        copied = true;
        setTimeout(() => {
            copied = false;
        }, 2000);
    }

    async function getGithubStats(): Promise<GithubData | null> {
        const workerResponse: Response = await fetch(
            "https://worker.fishstrap.app/",
        );

        if (!workerResponse.ok)
            console.error(`Worker data was null. ${workerResponse.statusText}`);

        const workerData = (await workerResponse.json()) as GithubData;
        console.log(workerData);
        return workerData;
    }

    onMount(async () => {
        githubStats = (await getGithubStats()) as GithubData;
        onReady = true;
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

<div class="font-['Inter_Variable'] min-h-screen w-full">
    {#if onReady}
        <main
            in:fly={{ y: -50, duration: 600 }}
            class="text-(--foreground) relative z-10 flex flex-col w-full pointer-events-none">
            <section
                class="min-h-[calc(100vh-6rem)] mt-24 flex flex-col lg:flex-row items-center justify-center w-full max-w-360 2xl:max-w-480 mx-auto pointer-events-none px-4 sm:px-6 lg:px-8 gap-8 lg:gap-16 2xl:gap-32">
                <div
                    class="w-full lg:w-1/2 pointer-events-none flex flex-col items-center lg:items-start text-center lg:text-left">
                    <Image
                        delay={0}
                        divclass="dark:hidden w-3/4 sm:w-1/2 lg:w-3/4 2xl:w-full pointer-events-none h-auto z-100 mb-8 lg:mb-12 2xl:mb-16"
                        src="img/Fishstrap-Light.png" />
                    <Image
                        delay={0}
                        divclass="dark:block hidden w-3/4 sm:w-1/2 lg:w-3/4 2xl:w-full pointer-events-none h-auto z-100 mb-8 lg:mb-12 2xl:mb-16"
                        src="img/Fishstrap-Dark.png" />
                    <p
                        class="font-medium text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl pointer-events-none z-100 max-w-2xl lg:max-w-none leading-relaxed">
                        Fishstrap is an alternative to the normal Roblox
                        bootstrapper, with tons of features that cannot be found
                        in the regular app.
                        <br />
                        <br />

                        Found any bugs? Submit an <Link
                            href="https://github.com/returnrqt/fishstrap/issues">
                            issue
                        </Link>
                        <br />
                        Need help with an issue? Go to the <Link
                            href="https://wiki.fishstrap.app/">
                            wiki
                        </Link>
                        <br />
                        Want some mods? Join our <Link
                            href="https://discord.gg/dZJSbgHx8y">
                            server
                        </Link>
                        <br />
                    </p>

                    <!--thank you Francois for the button!-->
                    <div
                        class="flex wrapper pointer-events-auto mt-12 mb-4 justify-center items-center lg:justify-start bg-(--muted-foreground)/25 rounded-lg">
                        <a
                            id="downloadbutton"
                            href={downloadUrl}
                            class="c-btn backdrop-blur-2xl">
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
                    <span class="font-bold text-md text-(--foreground)/50">
                        Or, Install from Winget:
                    </span>
                    <div
                        class="pointer-events-auto mt-4 font-[consolas] border border-(--foreground)/15 bg-(--foreground)/15 px-4 py-2 backdrop-blur-xl transition-all duration-300 text-xs sm:text-base md:text-lg 2xl:text-xl p-2 2xl:p-4 rounded-lg w-fit max-w-full self-center lg:self-start flex items-center gap-3 sm:gap-4">
                        <span class="whitespace-nowrap">
                            > winget install Fishstrap.Fishstrap
                        </span>
                        <button
                            onclick={copyToClipboard}
                            class="text-sm bg-(--foreground)/10 hover:bg-(--foreground)/15 transition-alls px-2 py-1 rounded text-(--foreground)/70 hover:text-(--foreground) font-[Inter_Variable]">
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>

                    <div class="mt-4 pointer-events-none">
                        <p class="text-sm opacity-75">
                            View the repository on <Link
                                href="https://github.com/returnrqt/fishstrap">
                                Github
                            </Link>
                        </p>
                    </div>

                    <div class="inline-flex gap-4 mt-4">
                        <div
                            class="pointer-events-none border border-(--foreground)/10 bg-(--foreground)/15 px-4 py-2 backdrop-blur-xl transition-all duration-300 text-base p-2 2xl:p-4 rounded-lg w-fit max-w-full self-center lg:self-start flex items-center gap-2 sm:gap-2">
                            <Download
                                className="fill-(--foreground)"
                                svgWidth="22"
                                svgHeight="22" />
                            {githubStats?.total_release_downloads}
                        </div>

                        <div
                            class="pointer-events-none border border-(--foreground)/10 bg-(--foreground)/15 px-4 py-2 backdrop-blur-xl transition-all duration-300 text-base p-2 2xl:p-4 rounded-lg w-fit max-w-full self-center lg:self-start flex items-center gap-2 sm:gap-2">
                            <Star
                                svgWidth="24"
                                svgHeight="24"
                                className="fill-(--foreground)" />
                            {githubStats?.stars}
                        </div>
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
</div>
