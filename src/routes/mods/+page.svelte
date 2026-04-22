<!-- @format -->
<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    import type { Mod } from "./+page.server.ts";

    import Card from "$lib/component/Card.svelte";
    import Search from "$lib/svg/Search.svelte";

    let searchQuery = $state("");
    let selectedCategory = $state("All");
    let onReady = $state(false);

    let { data } = $props();

    let categories = $derived([
        "All",
        ...new Set(data.mods.map((m: Mod) => m.category)),
    ]);

    let normalizedQuery = $derived(searchQuery.toLowerCase());

    let filteredMods = $derived(
        data.mods.filter((mod: Mod) => {
            const matchesSearch =
                mod.title.toLowerCase().includes(normalizedQuery) ||
                mod.description.toLowerCase().includes(normalizedQuery);

            const matchesCategory =
                selectedCategory === "All" || mod.category === selectedCategory;

            return matchesSearch && matchesCategory;
        }),
    );

    onMount(async () => {
        onReady = true;
    });
</script>

<div
    class="font-['Inter_Variable'] flex bg-black w-full min-h-screen flex-col text-white">
    {#if onReady}
        <div
            class="flex flex-col mt-32 mx-auto items-center text-center max-w-3xl px-4">
            <h1 class="text-4xl font-bold">Mods</h1>
            <p class="mt-4 text-xl text-white/75">
                Search the community database to find a mod you like. From
                themes, to sound effects, and even bootstrapper themes.
            </p>
        </div>

        <main
            class="mx-16 flex flex-col xl:flex-row w-fit mt-24 items-start gap-8">
            <div
                in:fly={{ y: -50, duration: 600 }}
                class="w-full xl:w-80 shrink-0 flex flex-col gap-6 z-100">
                <div
                    class="flex flex-col backdrop-blur-2xl border border-white/10 bg-white/5 p-4 xl:p-6 rounded-lg w-full gap-3">
                    <span class="text-base font-bold">Search</span>
                    <div
                        class="flex items-center gap-2 border border-white/10 bg-white/5 rounded-lg px-4 py-2 focus-within:border-white/30 transition-colors">
                        <Search
                            svgHeight="20"
                            svgWidth="20"
                            className="opacity-55 shrink-0" />
                        <input
                            bind:value={searchQuery}
                            class="text-sm focus:outline-none bg-transparent w-full"
                            type="search"
                            name="q"
                            placeholder="Type here to search..." />
                    </div>

                    <span class="text-base font-bold mt-2">Filters</span>
                    <div class="flex flex-wrap gap-2">
                        {#each categories as category}
                            <button
                                onclick={() =>
                                    (selectedCategory = category as string)}
                                class="px-3 py-1.5 text-sm rounded-lg border transition-all duration-200
                                {selectedCategory === category
                                    ? 'bg-white text-black border-white'
                                    : 'bg-white/5 border-white/10 text-white/75 hover:bg-white/10 hover:text-white'}">
                                {category}
                            </button>
                        {/each}
                    </div>
                </div>
            </div>

            <div
                in:fly={{ y: -50, duration: 600, delay: 300 }}
                class="flex flex-wrap flex-1 gap-4 w-fit justify-center">
                {#if filteredMods.length > 0}
                    {#each filteredMods as mod}
                        <Card
                            href={mod.href}
                            title={mod.title}
                            description={mod.description}
                            image={mod.image}
                            author={mod.author}
                            authorImage={mod.authorImage} />
                    {/each}
                {:else}
                    <div
                        class="flex items-center justify-center h-84 w-85 backdrop-blur-2xl border border-dashed border-white/20 rounded-lg bg-white/5">
                        <span class=" text-white/50">
                            No mods found matching your search.
                        </span>
                    </div>
                {/if}
            </div>
        </main>
    {/if}
</div>
