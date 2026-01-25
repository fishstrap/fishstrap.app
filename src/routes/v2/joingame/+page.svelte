<!-- @format -->
<script lang="ts">
    // this is unused and broken lol

    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import Image from "$lib/component/Image.svelte";
    import { fly } from "svelte/transition";
    let { data } = $props();

    let {
        placeId,
        ogImageUrl,
        launchData,
        gameThumbnail,
        gameInstanceId,
        gameName,
        gameDescription,
        players,
    } = data;

    let onReady = $state();

    onMount(() => {
        if (placeId === undefined || placeId === null) {
            window.location.href = "/";
            return;
        }
        onReady = true;
        if (placeId) {
            setTimeout(() => {
                window.location.href = `roblox://experiences/start?placeId=${placeId}${gameInstanceId ? `&gameInstanceId=${gameInstanceId}` : ""}${launchData ? `&launchData=${launchData}` : ""}`;
            }, 1200);
        }
    });
</script>

<svelte:head>
    {#if ogImageUrl}
        <title>Join {gameName || 'Experience'}!</title>
        <meta
            property="og:title"
            content="Join {gameName || 'this Experience'}!" />
        <meta
            property="og:description"
            content={gameDescription ||
                "This link was generated with Fishstrap."} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={$page.url.href} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:title" content={gameName} />
        <meta name="twitter:description" content={gameDescription} />

        <meta name="theme-color" content="#00A2FF" />
    {/if}
</svelte:head>

<div class="flex h-screen w-full bg-black">
    {#if onReady}
        <div class="flex w-full flex-col justify-center m-24 mb-24">
            <span
                class="font-[Inter_Variable] text-lg text-white/55"
                in:fly={{ y: 0, x: -75, duration: 600, delay: 200 }}>
                You are being redirected to:
            </span>
            <div
                class="flex flex-col my-4 w-[337px] max-h-[300px] rounded-lg bg-[#121215] p-4"
                in:fly={{ y: 0, x: -75, duration: 600, delay: 500 }}>
                <Image
                    imgclass="rounded-lg"
                    width="305"
                    height="171.567"
                    delay={500}
                    divclass="w-[305px] h-[171.567px]"
                    src={gameThumbnail} />
                <div class="h-[54px] w-full mt-2 text-md">
                    <div
                        class="font-[Builder_Sans_Bold] mb-1 text-white font-bold">
                        {gameName}
                    </div>
                    <div class="w-full inline-flex">
                        <img
                            src="/img/Player.png"
                            width="16"
                            height="16"
                            alt="thumbnail" />
                        <span
                            class="font-[Builder_Sans_Medium] font-medium text-white text-xs opacity-75 pl-1 pr-3">
                            {players}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
