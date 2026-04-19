<!-- @format -->
<script lang="ts">
    interface Props {
        cardImage: string;
        cardTitle: string;
        cardDescription: string;
        cardAuthorImage: string;
        cardAuthor: string;
    }

    let {
        cardImage = "",
        cardTitle = "",
        cardDescription = "",
        cardAuthorImage = "",
        cardAuthor = "",
    }: Props = $props();
</script>

<a href="" class="flex">
    <div
        class="flex flex-col overflow-hidden h-84 w-85 border rounded-lg border-white/15 bg-center bg-no-repeat transition-all duration-300 shrink-0">
        <img class="w-full object-contain h-48" alt="" src={cardImage} />

        <div
            class="flex flex-col w-full gap-1 p-2 px-4 bg-[#0d0d0d] text-white h-full border-t border-white/15">
            <span class="text-base font-bold justify-start">
                {cardTitle}
            </span>

            <span class="text-sm font-normal text-white/75 line-clamp-2">
                {cardDescription}
            </span>

            <div
                class="inline-flex items-center mt-auto mb-2">
                <img
                    class="border border-white/5 rounded-full w-8 h-8"
                    src={cardAuthorImage}
                    alt="" />
                <span class="ml-2 font-medium text-sm text-white/75">
                    {cardAuthor}
                </span>
            </div>
        </div>
    </div>
</a>
