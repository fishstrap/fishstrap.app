<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    import Image from "$lib/components/ui/Image.svelte";
    import Link from "$lib/components/ui/Link.svelte";
    import StarIcon from "@lucide/svelte/icons/star";
    import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
    import DownloadIcon from "@lucide/svelte/icons/download";
    import * as Card from "$lib/components/ui/card";

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
                        <a
                            id="downloadbutton"
                            href={downloadUrl}
                            class="c-btn backdrop-blur-2xl">
                            <span class="c-btn__label">
                                Download &nbsp; | <DownloadIcon />
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
                        divclass="hidden lg:visible lg:flex max-w-full h-auto drop-shadow-2xl"
                        src="img/Showcase.webp" />

                    <div
                        class="grid grid-cols-2 grid-rows-2 w-full pointer-events-auto my-4 gap-2 justify-start items-center">
                        <a
                            class="h-full w-full duration-300 hover:-translate-y-1"
                            href="https://wiki.fishstrap.app/">
                            <Card.Root class="h-full w-full">
                                <Card.Header>
                                    <Card.Title>Fishstrap Wiki</Card.Title>
                                    <Card.Description>
                                        The official wiki for everything
                                        Fishstrap.
                                    </Card.Description>
                                    <Card.Action>
                                        <ExternalLinkIcon size="22" />
                                    </Card.Action>
                                </Card.Header>
                            </Card.Root>
                        </a>

                        <a
                            class="h-full w-full duration-300 hover:-translate-y-1"
                            href="https://discord.com/invite/dZJSbgHx8y">
                            <Card.Root class="h-full w-full">
                                <Card.Header>
                                    <Card.Title>Discord server</Card.Title>
                                    <Card.Description>
                                        The official Discord server for
                                        Fishstrap.
                                    </Card.Description>
                                    <Card.Action>
                                        <ExternalLinkIcon size="22" />
                                    </Card.Action>
                                </Card.Header>
                            </Card.Root>
                        </a>

                        <a
                            class="h-full w-full duration-300 hover:-translate-y-1"
                            href="https://github.com/fishstrap/fishstrap">
                            <Card.Root class="h-full w-full">
                                <Card.Header>
                                    <Card.Title>Github Repo</Card.Title>
                                    <Card.Description>
                                        The official Github repository for
                                        Fishstrap.
                                    </Card.Description>
                                    <Card.Action>
                                        <ExternalLinkIcon size="22" />
                                    </Card.Action>
                                </Card.Header>
                            </Card.Root>
                        </a>

                        <a
                            class="h-full w-full duration-300 hover:-translate-y-1"
                            href="/mods">
                            <Card.Root class="h-full w-full">
                                <Card.Header>
                                    <Card.Title>Mods</Card.Title>
                                    <Card.Description>
                                        Check the page for mods you might like.
                                    </Card.Description>
                                    <Card.Action>
                                        <ExternalLinkIcon size="22" />
                                    </Card.Action>
                                </Card.Header>
                            </Card.Root>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    {/if}
</div>
