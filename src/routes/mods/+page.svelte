<!-- @format -->
<script lang="ts">
    import Card from "$lib/component/Card.svelte";
    import Search from "$lib/svg/Search.svelte";
</script>

<div class="font-['Inter_Variable'] flex bg-black w-full h-screen flex-col">
    <div class="flex flex-col text-white mt-32 mx-auto items-center">
        <span class="text-4xl text-white">Mods</span>
        <span class="mt-2 text-xl text-white/75">
            Search the community databse to find a mod you like. From themes, to
            soundeffects, and even bootstrapper themes.
        </span>
    </div>

    <main class="mx-16 flex w-full mt-24 text-white items-start gap-4">
        <div class="flex-1 flex justify-start">
            <div
                class="flex justify-start border border-white/10 bg-white/5 px-8 py-4 transition-all duration-300 text-base p-2 2xl:p-4 rounded-lg max-w-full gap-2">
                <div class="flex flex-col gap-2">
                    <span class="text-base font-bold">Search</span>
                    <div
                        class="inline-flex justify-start items-center gap-1 border border-white/10 bg-white/5 rounded-lg px-4 py-2">
                        <Search
                            svgHeight="20"
                            svgWidth="20"
                            className="opacity-55" />
                        <input
                            class="text-sm focus:outline-none bg-transparent"
                            type="search"
                            name="q"
                            placeholder="Type here to search..." />
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-wrap gap-4 basis-[75%]">
            <Card
                cardTitle="Pinkstrap Theme"
                cardAuthor="sigmalelda"
                cardDescription="#EEBBF9 -> #EF86D6"
                cardImage="https://cdn.discordapp.com/attachments/1426975119619915946/1426975119905132638/C7PF9mh.png?ex=69e65924&is=69e507a4&hm=82e9da4ad396acd042d5e1b50620570a043d31c2595948d46fd47d5f3219921f&"
                cardAuthorImage="https://cdn.discordapp.com/avatars/1338252734146543646/038461a4202f58f97e2e22664dd6189d.webp?size=128" />

            <Card
                cardTitle="Voltstrap theme"
                cardAuthor="Zynox"
                cardDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, doloremque blanditiis molestiae eveniet doloribus consectetur veniam possimus natus accusantium quae totam quas. Cumque sed repellendus quasi debitis odio provident!"
                cardImage="https://cdn.discordapp.com/attachments/1495431640124756139/1495431640455843860/2026-04-19_171949.png?ex=69e638be&is=69e4e73e&hm=803e43ec4d3e6fd140fc2d706a1bd8f06afac3d0142ba7aedc3fb2475f788bc5&"
                cardAuthorImage="https://cdn.discordapp.com/avatars/1261770630483673099/5415d4a6c1d9bc9d6ff88ff2c9de8d3e.webp?size=80" />

            <Card
                cardTitle="Lebronstrap"
                cardAuthor="katsu"
                cardDescription="if you love lebron alot youll love this theme"
                cardImage="https://cdn.discordapp.com/attachments/1452710851000926308/1452710851244064910/image.png?ex=69e65ee8&is=69e50d68&hm=160e014270e78876d69219755c16414d7140b622a40ed7394a34c65611fe5085&"
                cardAuthorImage="https://cdn.discordapp.com/avatars/1087008014709575870/f3a4894148cd9d90363948f05bead9ab.webp?size=80" />
                
            <Card
                cardTitle="Solara Bootstrapper"
                cardAuthor="soggy"
                cardDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, doloremque blanditiis molestiae eveniet doloribus consectetur veniam possimus natus accusantium quae totam quas. Cumque sed repellendus quasi debitis odio provident!"
                cardImage="https://cdn.discordapp.com/attachments/1332975151872086049/1332975152329134194/image.png?ex=69e67e19&is=69e52c99&hm=dc6d94245cefb63b78e3e2f77bb97c5e1c67593bed226e8fd38c439e9f9d5db6&"
                cardAuthorImage="https://cdn.discordapp.com/avatars/1178160689257390121/18faabe5b35851848c7a4a2e1b0d27b7.webp?size=80" />

            <Card
                cardTitle="Skybox Collection (50+)"
                cardAuthor="Nirv"
                cardDescription="A Simple collection of skyboxes i've collected so far."
                cardImage="https://gamebanana.com/mods/embeddables/566572?variant=sd_image"
                cardAuthorImage="https://cdn.discordapp.com/avatars/1220912328086917131/fd43e64b18eb4a60203256a1fd1b2b14.webp?size=80" />

            <Card
                cardTitle="24K Gradient Gold Theme"
                cardAuthor="Denver"
                cardDescription="The golden theme for the elite."
                cardImage="https://gamebanana.com/mods/embeddables/543392?variant=sd_image"
                cardAuthorImage="https://cdn.discordapp.com/guilds/1299397064165429360/users/808030378521788446/avatars/81e25901c719f88fe73d85093c3b38da.webp?size=128" />
        </div>

        <div class="flex-1"></div>
    </main>
</div>
