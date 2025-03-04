<script>
    let logo = "img/Logo.png";
    let showcase = "img/Showcase.png";

    import { onMount } from 'svelte';

    onMount(() => {
        const container = document.querySelector("#container"),
            tile = document.querySelector(".tile");

        for(let i = 0 ; i < 1500; i++) {
            container.appendChild(tile.cloneNode());
        }
    });
</script>

<body class="h-screen w-full flex bg-black items-center justify-center overflow-hidden perspective-[1200px]">
    <div id="container" class="w-[140rem] blur-[2px] absolute grid grid-rows-40 grid-cols-40 scale-150 aspect-square rotate-x-50 -rotate-y-5 rotate-z-20 -translate-y-50 -translate-x-75
    after:bg-radial after:from-transparent after:from-5% after:to-black after:to-80% after:z-3">
        <div class="tile border-1
        duration-1000
        hover:duration-0
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
        border-white/40">
        </div>
    </div>
</body>
<div class="content text-xl pointer-events-none text-white flex flex-col w-auto">
    <img class="w-175 h-auto z-100 justify-start items-center mb-12" src={logo} alt="logo" />
    <!-- <img class="w-135 h-auto z-100 justify-start items-center" src={showcase} alt="showcase"> -->
    <p class="pointer-events-auto z-100 justify-start items-center">
        Fishstrap is a Bloxstrap fork aiming to enhance some of the features.
        <br> 
        Found any bugs? Submit an <a href="https://github.com/returnrqt/fishstrap/issues">issue</a> or create bug report in our <a href="https://discord.gg/xSsamjAU84">discord server</a>.
        <br> <br>
        View repository on <a class="repo" href="https://github.com/returnrqt/fishstrap"> Github. </a>
    </p>
    <br>
    <!--thank you Francois for the button!-->
    <div class="wrapper pointer-events-auto mt-12 justify-end">
        <a id="downloadbutton" href="/download" class="c-btn">
        <span class="c-btn__label">Download<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></a>
    </div>
</div>
<!-- <img class="showcase" src="img/Showcase.png" alt="Fishstrap showcase" /> -->