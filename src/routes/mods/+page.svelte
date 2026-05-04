<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    import type { Mod } from "./+page.server.ts";

    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Field from "$lib/components/ui/field/index.js";
    import Card from "$lib/components/ui/Card.svelte";

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
    class="font-['Inter_Variable'] flex bg-(--background) w-full min-h-screen flex-col text-(--foreground) justify-center">
    {#if onReady}
        <div
            class="flex flex-col mt-32 mx-auto items-center text-center max-w-3xl px-4">
            <h1 class="text-4xl font-bold">Mods</h1>
            <p class="mt-4 text-xl text-(--foreground)/75">
                Search the community database to find a mod you like. From
                themes, to sound effects, and even bootstrapper themes.
            </p>
        </div>

        <main
            class="flex flex-col mt-24 gap-8 w-full items-center justify-center pb-32">
            <div
                class="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-max flex bg-(--background)/80 backdrop-blur-3xl shadow-2xl gap-2 border border-(--foreground)/15 p-4 rounded-2xl transition-colors z-50">
                <Field.Set class="flex flex-col sm:flex-row gap-4 w-full">
                    <div class="w-full sm:w-auto">
                        <Field.Legend>Search</Field.Legend>
                        <Field.Description>
                            <Input
                                bind:value={searchQuery}
                                class="mt-3.5 w-full"
                                type="search"
                                name="q"
                                placeholder="Type here to search..." />
                        </Field.Description>
                    </div>
                    <div class="w-full sm:w-auto">
                        <Field.Legend>Filter</Field.Legend>
                        <Field.Content>
                            <div
                                class="flex flex-wrap gap-2 text-(--foreground) mt-2">
                                {#each categories as category}
                                    <Button
                                        class="w-fit"
                                        variant="outline"
                                        onclick={() =>
                                            (selectedCategory =
                                                category as string)}>
                                        {category}
                                    </Button>
                                {/each}
                            </div>
                        </Field.Content>
                    </div>
                </Field.Set>
            </div>

            <div
                in:fly={{ y: -50, duration: 600, delay: 300 }}
                class="flex flex-wrap flex-1 gap-4 max-w-428 justify-center">
                {#if filteredMods.length > 0}
                    {#each filteredMods as mod}
                        <Card
                            className="hover:-translate-y-1 duration-300 transition-all"
                            href={mod.href}
                            title={mod.title}
                            description={mod.description}
                            image={mod.image}
                            author={mod.author}
                            authorImage={mod.authorImage} />
                    {/each}
                {:else}
                    <div
                        class="flex items-center justify-center h-84 w-85 backdrop-blur-2xl border border-dashed border-(--foreground)/20 rounded-lg bg-(--background)/5">
                        <span class=" text-(--foreground)/50">
                            No mods found matching your search.
                        </span>
                    </div>
                {/if}
            </div>
        </main>
    {/if}
</div>
