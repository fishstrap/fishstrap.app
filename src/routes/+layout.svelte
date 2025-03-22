<!-- @format -->
<script>
    let { children } = $props();

    import "../lib/css/button.css";
    import "../app.css";
    import { onMount } from "svelte";

    onMount(() => {
        const container = document.querySelector("#container"),
            tile = document.querySelector(".tile");

        for (let i = 0; i < 1500; i++) {
            container.appendChild(tile.cloneNode());
        }
    });
</script>

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

{@render children()}
