<script>
    import Background from "../component/Background.svelte"
    import Link from "../component/Link.svelte"
    import Image from "../component/Image.svelte"

    let logo = "img/Logo.png";
    let showcase = "img/Showcase.png";
</script>

<svelte:head>
	<title> | &nbsp;&nbsp;Home</title>
</svelte:head>

<div class="text-2xl m-4 sm:m-8 md:m-12 justify-center items-center pointer-events-none overflow-hidden text-white flex flex-col w-auto z-100">
    <Image css="max-w-[80%] sm:max-w-[70%] md:max-w-[60%] xl:max-w-[50%] 2xl:max-w-[40%] h-auto z-100 mb-12" src={logo} alt="logo"/>

    <p class="font-medium text-md sm:text-xl md:text-xl pointer-events-auto z-100 text-left">
        Fishstrap is a Bloxstrap fork aiming to enhance some of the features.<br><br>
        Found any bugs? Submit an <Link content="issue" href="https://github.com/returnrqt/fishstrap/issues"/>.<br>
        Want some mods to spice up your roblox? Join our <Link content="Discord Server" href="https://discord.gg/xSsamjAU84"/>.<br>
    </p>
    <br>

    <!--thank you Francois for the button!-->
    <div class="wrapper pointer-events-auto mt-6 justify-end">
        <a id="downloadbutton" href="/download" class="c-btn">
        <span class="c-btn__label">Download &nbsp; | <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </a>
    </div>
    
    <div class="mt-8">
        <p class="text-sm align-bottom opacity-75">
            View the repository on <Link content="Github" href="https://github.com/returnrqt/fishstrap"/>.
        </p>
    </div>
</div>

<Background/>
