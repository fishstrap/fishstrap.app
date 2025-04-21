<script lang="ts">
    // import Table from "../../component/Table.svelte";
    import GradientText from "../../component/GradientText.svelte";
    import Card from "../../component/Card.svelte";

    import type { PageData } from './$types';
    import { fly } from 'svelte/transition';
    import { onMount } from "svelte";

    export let data: PageData;
    let usernames = data.usernames;
    let visibleCards = Array().fill(false);
    onMount(() => {
        usernames.forEach((_, index) => {
            setTimeout(() => {
                visibleCards[index] = true;
            }, 300 * index);
        });
    });
</script>

<div class="background-gradient flex flex-col justify-start items-start p-12 w-full h-screen custom-scrollbar overflow-y-auto">
    <span class="text-5xl mb-4">
        <GradientText>Supporters</GradientText>
    </span>
    <span class="text-xl text-gray-300 mb-4">
        These are the people who have financially supported the development of Fishstrap.
    </span>

    <hr class="border-t border-white opacity-100 w-full mb-4" />

    <div class="flex flex-row flex-wrap h-screen  w-full pr-4">
        {#each usernames as user, i}
            {#if visibleCards[i]}
                <div in:fly={{ y: 50, duration: 1000, delay: i * 150 }}>
                    <Card user={user} type={data.types[i]} amt={data.amounts[i]} />
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