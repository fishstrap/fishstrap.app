<!-- @format -->
<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    import Link from "../component/Link.svelte";

    let logo = "img/Logo.png";
    let showcase = "img/Showcase.png";

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
        fetchData();
    });
</script>

<svelte:head>
    <title>| &nbsp;&nbsp;Home</title>
</svelte:head>

{#if onReady}
    <div
        in:fly={{ y: -50, duration: 600 }}
        class="text-white pointer-events-none overflow-hidden flex h-screen z-100 justify-center items-center">
        <div class="z-100 2xl:ml-24 justify-center items-center xl:max-w-1/2 lg:p-12">
            <img
                class="max-w-[100%] sm:max-w-[100%] md:max-w-[100%] lg:max-w-[50%] xl:max-w-[100%] 2xl:max-w-[80%] h-auto z-100 mb-12 px-6 lg:px-0 lg:pl-6"
                src={logo}
                alt="logo" />
            <p
                class="font-medium text-md sm:text-xl md:text-xl pointer-events-none z-100 text-center lg:text-left">
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
            <div class="flex wrapper pointer-events-auto mt-12 justify-center items-center lg:justify-start">
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
                class="text-center lg:text-left text-transparent bg-clip-text bg-gradient-to-r from-astronaut-blue-300 to-astronaut-blue-600 z-100">
                <p class="text-md mt-2">
                    Downloads: {totalDownloads == null ? "?" : totalDownloads} Stars:
                    {stars == null ? "?" : stars}
                </p>
            </div>

            <div class="mt-4">
                <p class="text-sm text-center opacity-75 lg:text-left">
                    View the repository on <Link
                        content="Github"
                        href="https://github.com/returnrqt/fishstrap" />
                </p>
            </div>
        </div>
        <div class="z-100 hidden xl:flex xl:pl-12 2xl:pr-32"> 
            <img class="max-w-[100%]" src={showcase} alt="showcase" />
        </div>
    </div>
{/if}
