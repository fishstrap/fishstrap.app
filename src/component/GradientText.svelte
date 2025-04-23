<!-- @format -->
<script>
    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { children } = $props();
</script>

<div
    class="text-center lg:text-left text-transparent bg-clip-text bg-gradient-to-r from-astronaut-blue-300 to-astronaut-blue-600 z-100">
    <p>
        {@render children?.()}
    </p>
</div>
