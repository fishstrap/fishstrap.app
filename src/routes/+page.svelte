<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    import Image from "$lib/components/ui/Image.svelte";
    import Link from "$lib/components/ui/Link.svelte";
    import * as Card from "$lib/components/ui/card";

    import StarIcon from "@lucide/svelte/icons/star";
    import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
    import DownloadIcon from "@lucide/svelte/icons/download";

    let onReady: boolean = $state(false);
    let copied: boolean = $state(false);
    let githubStats: GithubData | null = $state(null);

    const features = [
        {
            title: "Clean User Interface",
            description:
                "Powered by WPFUI, Fishstrap provides a clean, modern interface that takes the complexity out of customizing your experience.",
            image: "/img/Showcase-UI",
            size: "w-160",
            reverse: false,
        },
        {
            title: "Custom Modifications",
            description:
                "Take complete control of your visual experience with customizable themes for both the Fishstrap bootstrapper and the Roblox client itself.",
            image: "/img/Theme-Showcase",
            size: "w-160",
            reverse: true,
        },
        {
            title: "Accurate Server Information",
            description:
                "Instantly view accurate, real-time server information like region and uptime, powered by the RoValra API.",
            image: "/img/Server-Info-Showcase",
            size: "w-160",
            reverse: false,
        },
        {
            title: "Discord Rich Presence",
            description:
                "Custom Discord Rich Presence, to show everyone what games you're playing. Also supports BloxstrapRPC. (duh.)",
            image: "/img/RPC",
            size: "w-90",
            reverse: true,
        },
    ];

    const cards = [
        {
            href: "https://wiki.fishstrap.app/",
            title: "Fishstrap Wiki",
            description: "The official wiki for everything Fishstrap.",
        },
        {
            href: "https://discord.com/invite/dZJSbgHx8y",
            title: "Discord server",
            description: "The official Discord server for Fishstrap.",
        },
        {
            href: "https://github.com/fishstrap/fishstrap",
            title: "Github Repo",
            description: "The official Github repository for Fishstrap.",
        },
        {
            href: "/mods",
            title: "Mods",
            description: "Check the page for mods you might like.",
        },
    ];

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
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="og:site_name" content="Fishstrap" />
    <meta property="og:type" content="article" />
    <meta
        property="og:image"
        content="https://github.com/fishstrap/fishstrap.app/blob/dev/static/img/Showcase-Dark.png?raw=true" />
    <meta property="og:type" content="website" />
    <meta name="theme-color" content="#00A2FF" />
    <title>Fishstrap</title>
</svelte:head>

<div class="font-['Inter_Variable'] min-h-screen w-full">
    {#if onReady}
        <main
            in:fly={{ y: -50, duration: 600 }}
            class="text-(--foreground) relative z-10 flex flex-col w-full">
            <section
                class="min-h-[calc(100vh-6rem)] mt-12 flex flex-col lg:flex-row items-center justify-center w-full max-w-360 2xl:max-w-480 mx-auto pointer-events-none px-4 sm:px-6 lg:px-8 gap-8 lg:gap-16 2xl:gap-32">
                <div
                    class="w-full lg:w-1/2 pointer-events-none flex flex-col items-center lg:items-start text-center lg:text-left">
                    <Image
                        delay={0}
                        divclass="dark:hidden w-3/4 sm:w-1/2 lg:w-3/4 2xl:w-full pointer-events-none h-auto z-100 mb-8 lg:mb-12 2xl:mb-8"
                        src="img/Fishstrap-Light.png" />
                    <Image
                        delay={0}
                        divclass="dark:block hidden w-3/4 sm:w-1/2 lg:w-3/4 2xl:w-full pointer-events-none h-auto z-100 mb-8 lg:mb-12 2xl:mb-8"
                        src="img/Fishstrap-Dark.png" />
                    <p
                        class="font-normal text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl pointer-events-none z-100 max-w-2xl lg:max-w-none leading-relaxed">
                        Fishstrap is an alternative to the normal Roblox
                        bootstrapper, with tons of features that cannot be found
                        in the regular app.
                        <br />
                        <br />
                        Windows 10 and above.
                    </p>

                    <!--thank you Francois for the button!-->
                    <div
                        class="flex wrapper pointer-events-auto mt-4 mb-4 justify-center items-center lg:justify-start bg-(--muted-foreground)/25 rounded-lg">
                        <a id="downloadbutton" href={downloadUrl} class="c-btn">
                            <span class="c-btn__label">
                                Download &nbsp; | <DownloadIcon />
                            </span>
                        </a>
                    </div>
                    <span class="font-bold text-md text-(--foreground)/50">
                        Or, Install from Winget:
                    </span>
                    <div
                        class="pointer-events-auto mt-4 font-mono border border-(--foreground)/15 bg-(--foreground)/15 px-4 py-2 backdrop-blur-xl transition-all duration-300 text-xs sm:text-base md:text-lg 2xl:text-xl p-2 2xl:p-4 rounded-lg w-fit max-w-full self-center lg:self-start flex items-center gap-3 sm:gap-4">
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
                            <DownloadIcon className="fill-(--foreground)" />
                            {githubStats?.total_release_downloads}
                        </div>

                        <div
                            class="pointer-events-none border border-(--foreground)/10 bg-(--foreground)/15 px-4 py-2 backdrop-blur-xl transition-all duration-300 text-base p-2 2xl:p-4 rounded-lg w-fit max-w-full self-center lg:self-start flex items-center gap-2 sm:gap-2">
                            <StarIcon class="fill-(--foreground)" />
                            {githubStats?.stars}
                        </div>
                    </div>
                </div>
                <div
                    class="lg:flex lg:flex-wrap w-full lg:w-1/2 justify-center pointer-events-none">
                    <Image
                        delay={0}
                        divclass="block dark:hidden hidden lg:flex max-w-full h-auto drop-shadow-2xl"
                        src="img/Showcase-Light.png" />
                    <Image
                        delay={0}
                        divclass="hidden dark:lg:flex max-w-full h-auto drop-shadow-2xl"
                        src="img/Showcase-Dark.png" />

                    <div
                        class="grid grid-cols-2 grid-rows-2 w-full pointer-events-auto my-4 gap-2 justify-start items-center">
                        {#each cards as card}
                            <a
                                class="h-full w-full duration-300 hover:-translate-y-1"
                                href={card.href}>
                                <Card.Root class="h-full w-full">
                                    <Card.Header>
                                        <Card.Title>{card.title}</Card.Title>
                                        <Card.Description>
                                            {card.description}
                                        </Card.Description>
                                        <Card.Action>
                                            <ExternalLinkIcon size="22" />
                                        </Card.Action>
                                    </Card.Header>
                                </Card.Root>
                            </a>
                        {/each}
                    </div>
                </div>
            </section>
            <h1
                class="mx-auto mb-16 lg:mb-24 text-4xl lg:text-5xl font-semibold text-center">
                Features
            </h1>

            {#each features as feature}
                <section
                    class="flex flex-col w-full items-center {feature.reverse
                        ? 'lg:flex-row-reverse'
                        : 'lg:flex-row'} mb-16 lg:mb-24 gap-8 lg:gap-0">
                    <div
                        class="flex w-full lg:w-1/2 justify-center {feature.reverse
                            ? 'lg:justify-start'
                            : 'lg:justify-end'}">
                        <div
                            class="flex flex-col gap-4 max-w-xl px-6 lg:px-8 text-center lg:text-left">
                            <h2 class="text-3xl lg:text-4xl font-bold mb-2">
                                {feature.title}
                            </h2>
                            <div class="text-lg lg:text-xl text-(--foreground)">
                                <p class="mb-2">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        class="flex items-center justify-center w-full lg:w-1/2 px-6 lg:px-8 {feature.reverse
                            ? 'lg:justify-end'
                            : 'lg:justify-start'}">
                        <img
                            class="block dark:hidden {feature.size} max-w-full h-auto drop-shadow-[0_10px_8px_var(--muted-foreground)]/5 transition-all duration-300 transform hover:scale-101 hover:-translate-y-1 pointer-events-auto"
                            src="{feature.image}-Light.png"
                            alt="" />
                        <img
                            class="hidden dark:block {feature.size} max-w-full h-auto drop-shadow-[0_10px_8px_var(--muted-foreground)]/5 transition-all duration-300 transform hover:scale-101 hover:-translate-y-1 pointer-events-auto"
                            src="{feature.image}-Dark.png"
                            alt="" />
                    </div>
                </section>
            {/each}

            <section
                class="flex flex-col lg:flex-row w-full items-center mb-16 lg:mb-24 gap-8 lg:gap-0">
                <div class="flex w-full lg:w-1/2 justify-center lg:justify-end">
                    <div
                        class="flex flex-col gap-4 max-w-xl px-6 lg:px-8 text-center lg:text-left">
                        <h2 class="text-3xl lg:text-4xl font-bold mb-2">
                            Fishstrap Invite Links
                        </h2>
                        <div class="text-lg lg:text-xl text-(--foreground)">
                            <p class="mb-2">
                                Share custom Fishstrap invite links to bring
                                friends into your game — even if they don't have
                                Fishstrap installed! (try it out!)
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    class="flex items-center justify-center lg:justify-start w-full lg:w-1/2 px-6 lg:px-8">
                    <div
                        class="flex justify-center items-center lg:items-start flex-col max-w-full">
                        <a
                            href="https://roblox.com/games/1818"
                            class="relative flex flex-col items-center lg:items-start w-fit max-w-full mb-4 transition-all duration-300 transform hover:scale-101 hover:-translate-y-1 pointer-events-auto">
                            <div
                                class="flex flex-col z-10 bg-(--muted-foreground)/8 border border-(--foreground)/10 rounded-lg px-4 py-4 w-full sm:w-fit max-w-full">
                                <img
                                    alt="crossroads"
                                    class="w-76 rounded-lg"
                                    src="/img/Crossroad.jpg" />
                                <span class="mt-1 text-lg font-medium">
                                    Classic: Crossroads
                                </span>
                                <span class="text-sm text-medium">
                                    by @Roblox
                                </span>
                            </div>

                            <svg
                                class="absolute -bottom-2.25 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-12 z-20 w-5 h-2.5 dark:text-[#161616] text-[#f4f4f4]"
                                viewBox="0 0 20 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0,0 L10,10 L20,0"
                                    fill="currentColor" />
                                <path
                                    d="M0,0 L10,10 L20,0"
                                    class="dark:stroke-[#2d2d2d] stroke-[#dcdcdc]"
                                    stroke-width="1"
                                    stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </a>

                        <a
                            class="flex w-fit max-w-full overflow-hidden text-ellipsis whitespace-nowrap bg-(--muted-foreground)/8 border border-(--foreground)/10 text-sm sm:text-lg px-4 py-1 rounded-full text-blue-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-101 pointer-events-auto"
                            aria-label="joingame-link"
                            href="https://www.fishstrap.app/v1/joingame?placeId=1818">
                            https://www.fishstrap.app/v1/joingame?placeId=1818
                        </a>
                    </div>
                </div>
            </section>
        </main>
    {/if}
</div>
