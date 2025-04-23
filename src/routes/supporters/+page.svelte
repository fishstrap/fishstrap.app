<!-- @format -->
<script lang="ts">
    // import Table from "../../component/Table.svelte";
    import GradientText from "../../component/GradientText.svelte";
    import Link from "../../component/Link.svelte";
    import Card from "../../component/Card.svelte";

    import type { PageData } from "./$types";
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    let usernames: string[] = data.usernames;
    let visibleCards = $state(Array().fill(false));
    onMount(() => {
        usernames.forEach((_, index) => {
            setTimeout(() => {
                visibleCards[index] = true;
            }, 300 * index);
        });
    });
</script>
<svelte:head>
    <title>| &nbsp;&nbsp;Supporters</title>
</svelte:head>

<div
    class="background-gradient flex flex-col justify-start items-start p-8 w-full h-screen custom-scrollbar overflow-y-auto">
    <span class="text-5xl mb-4">
        <GradientText>Supporters</GradientText>
    </span>
    <span class="text-xl/8 text-gray-300 mb-4">
        These are the people who have financially supported the development of
        Fishstrap.
        <br />
        You can support Fishstrap <Link href="https://ko-fi.com/fishstrap">
            here
        </Link>
    </span>
    <div
        class="mt-4 w-full flex flex-row flex-wrap justify-center xl:justify-start">
        <hr class="border-t border-white opacity-100 w-full mb-4" />
        {#each usernames as user, i}
            {#if visibleCards[i]}
                <div in:fly={{ y: 50, duration: 800, delay: i * 150 }}>
                    <Card
                        {user}
                        type={data.types[i]}
                        amt={data.amounts[i]}
                        currency={data.currencies[i]} />
                </div>
            {/if}
        {/each}
    </div>
</div>
<style>
    .background-gradient {
        background: linear-gradient(
            135deg,
            black,
            var(--color-astronaut-blue-950)
        );
    }

    .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
    }

    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
        transition: background 0.3s;
        height: 60px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
    }
</style>
