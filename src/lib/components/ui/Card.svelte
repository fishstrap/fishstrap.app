<!-- @format -->
<script lang="ts">
    interface Props {
        className?: string;
        href?: string;
        image?: string;
        title?: string;
        description?: string;
        authorImage?: string;
        author?: string;
    }

    let {
        className = "",
        href = "",
        image = "",
        title = "",
        description = "",
        authorImage = "",
        author = "",
    }: Props = $props();
</script>

<a {href} download>
    <div
        class="{className} flex flex-col overflow-hidden h-88 w-85 border rounded-lg backdrop-blur-2xl border-(--foreground)/15 transition-all duration-300 shrink-0 group-hover:border-(--foreground)/30 group-hover:-translate-y-1 group-focus-visible:border-(--foreground)/30 group-focus-visible:-translate-y-1">
        <img
            class="w-full object-contain h-48 shrink-0 bg-(--background)"
            alt=""
            src={image} />

        <div
            class="flex flex-col w-full gap-1 p-4 text-(--foreground) h-full bg-(--foreground)/5 border-t border-(--foreground)/15">
            <h3 class="text-base font-bold line-clamp-1">
                {title}
            </h3>

            <p
                class="text-sm font-normal text-(--foreground)/75 line-clamp-2 mt-1 min-h-10">
                {description}
            </p>

            <div class="inline-flex items-center mt-auto pt-1">
                <img
                    class="border border-(--foreground)/10 rounded-full w-8 h-8 object-cover shrink-0"
                    src={authorImage}
                    alt="" />
                <span
                    class="ml-2 font-medium text-sm text-(--foreground)/75 group-hover:text-(--foreground) transition-colors">
                    {author}
                </span>
            </div>
        </div>
    </div>
</a>
