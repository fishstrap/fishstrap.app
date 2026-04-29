<!-- @format -->
<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import Image from "$lib/components/ui/Image.svelte";
    import UserRoundIcon from "@lucide/svelte/icons/user-round";
    import { fly } from "svelte/transition";
    let { data } = $props();

    let {
        placeId,
        launchData,
        gameThumbnail,
        gameInstanceId,
        gameName,
        gameDescription,
        players,
    } = data;

    let onReady = $state(false);

    onMount(() => {
        if (!placeId) {
            window.location.href = "/";
            return;
        }

        onReady = true;
        setTimeout(() => {
            window.location.href = `roblox://experiences/start?placeId=${placeId}${gameInstanceId ? `&gameInstanceId=${gameInstanceId}` : ""}${launchData ? `&launchData=${launchData}` : ""}`;
        }, 1200);
    });
</script>

<svelte:head>
    {#if gameThumbnail}
        <title>Join {gameName}!</title>
        <meta property="og:title" content="Join {gameName}!" />
        <meta
            property="og:description"
            content={gameDescription ||
                "This invite link was generated with Fishstrap."} />
        <meta property="og:image" content={gameThumbnail} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={$page.url.href} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={gameThumbnail} />
        <meta name="twitter:title" content={gameName} />
        <meta
            name="twitter:description"
            content={gameDescription ||
                "This invite link was generated with Fishstrap."} />

        <meta name="theme-color" content="#00A2FF" />
    {/if}
</svelte:head>

<div class="flex h-screen w-full relative overflow-hidden bg-(--background)/45">
    {#if onReady}
        <div class="flex w-full flex-col justify-center m-24 mb-24">
            <div class="absolute top-0 left-0 w-full h-full scale-250">
                <img
                    class="w-full h-full blur-3xl opacity-45 animate-[spin_30s_linear_infinite] [-webkit-user-drag:none]"
                    src={gameThumbnail}
                    alt="" />
            </div>
            <span
                class="font-[Inter_Variable] text-lg text-(--foreground)/55"
                in:fly={{ y: 0, x: -75, duration: 600, delay: 200 }}>
                You are being redirected to:
            </span>
            <div
                class="flex flex-col my-4 w-84 max-h-75 rounded-lg bg-(--background) p-4 z-20"
                in:fly={{ y: 0, x: -75, duration: 600, delay: 500 }}>
                <Image
                    imgclass="rounded-lg [-webkit-user-drag:none]"
                    width="305"
                    height="171.567"
                    delay={500}
                    divclass="w-[305px] h-[171.567px]"
                    src={gameThumbnail} />
                <div class="h-13.5 w-full mt-2 text-md">
                    <div
                        class="font-[Builder_Sans_Bold] mb-1 text-(--foreground) font-bold">
                        {gameName}
                    </div>
                    <div class="w-full inline-flex">
                        <UserRoundIcon class="fill-(--foreground)" size="16" />
                        <span
                            class="font-[Builder_Sans_Medium] font-medium text-(--foreground) text-xs opacity-75 pl-1 pr-3">
                            {players}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
