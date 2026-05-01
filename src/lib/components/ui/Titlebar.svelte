<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { toggleMode } from "mode-watcher";

    import DownArrowIcon from "@lucide/svelte/icons/arrow-down";
    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonIcon from "@lucide/svelte/icons/moon";

    interface Props {
        downloadUrl: string;
        tagName: string;
    }

    let { downloadUrl, tagName }: Props = $props();
</script>

<header
    class="title-bar fixed left-4 right-4 top-4 z-1000 flex items-center justify-between rounded-full border border-(--foreground)/15 bg-(--background)/15 px-4 py-2 backdrop-blur-xl transition-all duration-300 md:left-8 md:right-8 md:py-2 lg:left-12 lg:right-12 xl:mx-auto xl:max-w-7xl">
    <div class="flex items-center gap-3">
        <div class="flex flex-col">
            <a
                href="/"
                class="font-['Inter_Variable'] text-base font-bold tracking-tight text-(--foreground) sm:text-lg">
                Fishstrap
            </a>
        </div>
        <span
            class="empty:hidden rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-(--foreground)/80 sm:block">
            {tagName}
        </span>
    </div>
    <div class="flex items-center gap-6">
        <nav class="items-center gap-6 md:flex">
            <a
                href="/mods"
                class="text-xs font-medium text-(--foreground)/70 transition-colors hover:text-(--foreground)">
                Mods
            </a>
        </nav>
        <nav class="items-center gap-6 md:flex">
            <a
                href="https://wiki.fishstrap.app/"
                target="_blank"
                class="text-xs font-medium text-(--foreground)/70 transition-colors hover:text-(--foreground)">
                Wiki
            </a>
        </nav>
        <nav class="items-center gap-6 md:flex">
            <a
                href="https://github.com/fishstrap/fishstrap"
                target="_blank"
                class="text-xs font-medium text-(--foreground)/70 transition-colors hover:text-(--foreground)">
                GitHub
            </a>
        </nav>
        <nav class="items-center gap-6 md:flex">
            <a
                href="https://discord.gg/mSpuD4cyAd"
                target="_blank"
                class="text-xs font-medium text-(--foreground)/70 transition-colors hover:text-(--foreground)">
                Discord
            </a>
        </nav>
        <nav class="items-center gap-6 md:flex">
            <a
                href="https://github.com/fishstrap"
                target="_blank"
                class="text-xs font-medium text-(--foreground)/70 transition-colors hover:text-(--foreground)">
                About Us
            </a>
        </nav>
        <Button size="sm" href={downloadUrl}>
            Download <DownArrowIcon />
        </Button>
        <Button onclick={toggleMode} variant="outline" size="icon">
            <SunIcon
                class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
            <MoonIcon
                class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0" />
            <span class="sr-only">Toggle theme</span>
        </Button>
    </div>
</header>

<style>
    @media (min-width: 0px) {
        .title-bar {
            visibility: hidden;
        }
    }
    @media (min-width: 500px) {
        .title-bar {
            visibility: visible;
        }
    }
</style>
