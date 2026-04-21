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

<a
    {href}
    download
    class="{className} flex group outline-none h-full backdrop-blur-2xl rounded-lg">
    <div
        class="flex flex-col overflow-hidden h-84 w-85 border rounded-lg border-white/15 transition-all duration-300 shrink-0 group-hover:border-white/30 group-hover:-translate-y-1 group-focus-visible:border-white/30 group-focus-visible:-translate-y-1">
        <img
            class="w-full object-contain h-48 shrink-0 bg-[#0d0d0d]"
            alt=""
            src={image} />

        <div
            class="flex flex-col w-full gap-1 p-4 text-white h-full bg-white/5 border-t border-white/15">
            <h3 class="text-base font-bold line-clamp-1">
                {title}
            </h3>

            <p
                class="text-sm font-normal text-white/75 line-clamp-2 mt-1 min-h-10">
                {description}
            </p>

            <div class="inline-flex items-center mt-auto pt-1">
                <img
                    class="border border-white/10 rounded-full w-8 h-8 object-cover shrink-0"
                    src={authorImage}
                    alt="" />
                <span
                    class="ml-2 font-medium text-sm text-white/75 group-hover:text-white transition-colors">
                    {author}
                </span>
            </div>
        </div>
    </div>
</a>
