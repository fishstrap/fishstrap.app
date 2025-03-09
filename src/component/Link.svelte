<script lang="ts">
    export let href = "";
    export let content = "";
</script>

<a target="_blank" class="hover:shadow-lg duration-250 text-astronaut-blue-600 hover:text-astronaut-blue-200 pointer-events-auto inline-flex" href={href}>
    {content} <span class="ml-1" style="font-family: Fira Code Variable, monospace; font-weight: 700;">-></span>
</a>
