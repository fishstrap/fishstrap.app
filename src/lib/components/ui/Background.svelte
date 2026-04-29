<div class="tile-grid fixed inset-0 z-0">
    {#each Array(550) as _, i}
        <div
            class="tile border border-(--foreground)/25 transition-colors ease-out hover:duration-0 hover:-translate-x-1 hover:-translate-y-1 duration-500
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
        ">
        </div>
    {/each}
</div>

<style>
    .tile-grid {
        display: grid;
        width: 100%;
        height: 100%;
        gap: 0;
        opacity: 0.4;
    }

    .tile {
        width: 100%;
        height: 100%;
        aspect-ratio: 1;
    }

    /** kinda dont like how we have to do responsive design in tailwind so im just going
        do it this way. yes its uglier compared to tailwind but i like the verbosity a bit more **/

    @media (min-width: 300px) {
        .tile-grid {
            grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
            grid-template-rows: repeat(auto-fill, minmax(60px, 1fr));
        }
    }

    @media (min-width: 1024px) {
        .tile-grid {
            grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
            grid-template-rows: repeat(auto-fill, minmax(90px, 1fr));
        }
    }

    @media (min-width: 2560px) {
        .tile-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            grid-template-rows: repeat(auto-fill, minmax(120px, 1fr));
        }
    }

    @media (min-width: 3060px) {
        .tile-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            grid-template-rows: repeat(auto-fill, minmax(240px, 1fr));
        }
    }
</style>
