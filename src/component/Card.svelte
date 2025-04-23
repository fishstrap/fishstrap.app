<!-- @format -->
<script lang="ts">
    import Image from "./Image.svelte";

    interface Props {
        user?: string;
        type?: string;
        amt?: string;
        currency?: string;
    }

    let {
        user = "John Doe",
        amt = "200",
        type = "One Time",
        currency = "USD",
    }: Props = $props();
</script>
<div
    class="w-64 relative shadow-white/10 shadow-2xl m-4 border border-white/25 rounded-md overflow-hidden">
    <div class="absolute inset-0 backdrop-blur-md"></div>
    <div class="absolute inset-0 opacity-10 bg-noise"></div>
    <div
        class="py-4 px-4 text-center relative flex justify-start items-center text-white">
        <Image
            width={96}
            height={96}
            delay={500}
            imgclass="rounded-full"
            divclass="w-12 h-12"
            src="img/User.webp" />
        <br />
        <span class="text-left w-16 ml-4 truncate">
            {user}
        </span>
        <span class="ml-4">
            {amt}{currency}
            <br />
            <span class="text-sm opacity-50">{type}</span>
        </span>
    </div>
</div>
<style>
    .bg-noise {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }
</style>
