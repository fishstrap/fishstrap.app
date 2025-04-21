<script lang="ts">
    interface Props {
        user?: string;
        type?: string;
        amt?: string;
    }

    let { user = "John Doe" , amt = "200 USD" , type = "One Time" }: Props = $props();
</script>

<div class="relative shadow-white/10 shadow-2xl m-4 border border-white/25 rounded-md overflow-hidden">
    <div class="absolute inset-0 backdrop-blur-md"></div>
    <div class="absolute inset-0 opacity-10 bg-noise"></div>
    <div class="w-96 relative flex px-12 items-center text-white">
            <img class="w-12 my-6 h-12 mr-6 rounded-full inline" src="img/User.png" alt="user" />
            <span class="w-1/3 truncate">
                {user}
            </span>
            <span class="ml-auto">
                {amt}
                <br/>
                <span class="text-sm opacity-50">{type}</span>
            </span>
    </div>
</div>

<style>
    .bg-noise {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }
</style>