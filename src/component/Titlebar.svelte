<!-- @format -->
<script lang="ts">
    let { downloadLatest } = $props();
</script>

<header
    class="fixed left-4 right-4 top-4 z-1000 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl transition-all duration-300 sm:px-6 md:left-8 md:right-8 md:py-2 lg:left-12 lg:right-12 xl:mx-auto xl:max-w-7xl">
    <div class="flex items-center gap-3">
        <div class="flex flex-col">
            <h1
                class="font-['Inter_Variable'] text-base font-bold tracking-tight text-white sm:text-lg">
                Fishstrap
            </h1>
        </div>
        <span
            class="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/80 sm:block">
            v3.1.0.0
        </span>
    </div>
    <div class="flex items-center gap-6">
        <nav class="items-center gap-6 md:flex">
            <a
                href="https://github.com/fishstrap/fishstrap"
                target="_blank"
                class="text-xs font-medium text-white/70 transition-colors hover:text-white">
                GitHub
            </a>
        </nav>
        <nav class="items-center gap-6 md:flex">
            <a
                href="https://discord.gg/mSpuD4cyAd"
                target="_blank"
                class="text-xs font-medium text-white/70 transition-colors hover:text-white">
                Discord
            </a>
        </nav>
        <button
            onclick={downloadLatest}
            class="group relative overflow-hidden rounded-full bg-astronaut-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-astronaut-blue-500 hover:shadow-[0_0_20px_-5px_rgba(13,122,188,0.5)] active:scale-95">
            <span class="relative z-10">Download</span>
        </button>
    </div>
</header>
