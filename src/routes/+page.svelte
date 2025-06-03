<!-- @format -->
<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import device from "svelte-device-info";

    import GradientText from "../component/GradientText.svelte";
    import Link from "../component/Link.svelte";
    import Image from "../component/Image.svelte";

    let onReady = $state(false);
    let stars = $state(null);
    let totalDownloads = $state(null);

    let showBackground = true;
    const mobile = device.isMobile || device.isTablet || device.isPhone;

    async function downloadLatest() {
        if (mobile) {
            window.location.href = "https://github.com/returnrqt/fishstrap";
            return;
        }

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

        const container = document.querySelector("#container"),
            tile = document.querySelector(".tile");

        for (let i = 0; i < 900; i++) {
            container.appendChild(tile.cloneNode());
        }
    });
</script>

<svelte:head>
    <title>| &nbsp;&nbsp;Home</title>
</svelte:head>

<div id="background" class="relative">
    <div
        class="absolute h-screen top-0 left-0 z-0 w-full bg-black items-center justify-center overflow-hidden perspective-[1200px]">
        <div
            id="container"
            class="opacity-50 before:inset-0 before:pointer-events-none after:inset-0 after:pointer-events-none w-[140rem] absolute grid grid-rows-40 grid-cols-40 scale-200 aspect-square rotate-x-50 -rotate-y-5 rotate-z-20 -translate-y-50 -translate-x-75">
            <div
                class="tile
            border-1
            duration-1000
            hover:duration-0
            border-white/40
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
            hover:transform hover:translate-x-[-7.5px] hover:translate-y-[-7.5px] ease-out">
            </div>
        </div>
    </div>
</div>

{#if onReady}
    <div
        in:fly={{ y: -50, duration: 600 }}
        class="text-white pointer-events-none overflow-hidden flex h-screen z-100 justify-center items-center">
        <div
            class="z-100 2xl:ml-24 justify-center items-center xl:max-w-1/2 lg:p-12">
            <Image
                delay={500}
                divclass="max-w-[100%] sm:max-w-[100%] md:max-w-[100%] lg:max-w-[50%] xl:max-w-[100%] 2xl:max-w-[80%] h-auto z-100 mb-12 px-6 lg:px-0 lg:pl-6"
                src="img/Logo.webp" />
            <p
                class="font-medium text-md sm:text-xl md:text-xl 2xl:text-3xl pointer-events-none z-100 text-center lg:text-left">
                Fishstrap is a Bloxstrap fork aiming to enhance some of the
                features.
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
                class="flex wrapper pointer-events-auto mt-12 justify-center items-center lg:justify-start">
                <a
                    id="downloadbutton"
                    href="/supporters"
                    target="_blank"
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

            <div class="mt-4">
                <GradientText>
                    Downloads: {totalDownloads == null ? "?" : totalDownloads} Stars:
                    {stars == null ? "?" : stars}
                </GradientText>
            </div>

            <div class="mt-4">
                <p class="text-sm text-center opacity-75 lg:text-left">
                    View the repository on <Link
                        href="https://github.com/returnrqt/fishstrap">
                        Github
                    </Link>
                </p>
            </div>
        </div>
        <div class="z-100 hidden xl:flex xl:pl-12 2xl:pr-32">
            <Image
                delay={500}
                divclass="max-w-[100%]"
                src="img/Showcase.webp" />
        </div>
    </div>
{/if}