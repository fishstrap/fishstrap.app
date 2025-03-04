<script lang="ts">
    export let href = "";
    export let content = "";
</script>

<a target="_blank" class="underline hover:shadow-lg duration-250 hover:shadow-astronaut-blue-500/75 text-astronaut-blue-600 hover:text-astronaut-blue-200" href={href}>
    {content}
</a>