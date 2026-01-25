<!-- @format -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/state'
    
    const placeId = page.url.searchParams.get("placeId");
    const gameInstanceId = page.url.searchParams.get("gameInstanceId");
    const launchData = page.url.searchParams.get("launchData");
    
    onMount(() => {
        if (!placeId) {
            window.location.href = "/";
            return;
        }
        window.location.href = `${window.location.origin}/v1/joingame?placeId=${placeId}${gameInstanceId ? `&gameInstanceId=${gameInstanceId}` : ""}${launchData ? `&launchData=${launchData}` : ""}`;
    });
</script>
<!--svelte-ignore  element_invalid_self_closing_tag-->
<div class="bg-black" />