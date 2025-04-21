<!-- @format -->
<script lang="ts">
    import GradientText from "../../component/GradientText.svelte";
    import Card from "../../component/Card.svelte";
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    let username: Array<string> = [
        "JoeBiden224",
        "Bell0211",
        "Rachael_Simmons",
        "CryptoKing99",
        "DevGuru42",
        "SunshineGirl",
        "MountainHiker",
        "CodeWizard404",
        "GamingLegend",
        "BookwormElite",
    ];

    let type: Array<string> = [
        "One-Time",
        "Monthly",
        "Monthly",
        "One-Time",
        "Monthly",
        "One-Time",
        "Monthly",
        "One-Time",
        "Monthly",
        "Monthly",
    ];

    const amt: string[] = [
        "10 USD",
        "200 BRL",
        "50 EUR",
        "1000 JPY",
        "75 GBP",
        "150 AUD",
        "500 INR",
        "30 CAD",
        "120 CHF",
        "800 CNY",
    ];

    let visibleCards = Array(username.length).fill(false);
    
    onMount(() => {
        username.forEach((_, index) => {
            setTimeout(() => {
                visibleCards[index] = true;
            }, 300 * index);
        });
    });
</script>

<div class="background-gradient flex flex-col justify-start items-start p-12 w-full h-screen">
    <span class="text-5xl mb-4">
        <GradientText>Supporters</GradientText>
    </span>
    <span class="text-xl text-gray-300 mb-2">
        These are the people who have supported the development of Fishstrap.
    </span>
    <div class="flex flex-row flex-wrap">
        {#each username as users, i}
            {#if visibleCards[i]}
                <div in:fly={{ y: 50, duration: 500, delay: i * 5 }}>
                    <Card user={users} type={type[i]} amt={amt[i]} />
                </div>
            {/if}
        {/each}
    </div>
    <!-- <Table headers={placeholder} user={username} type={type}/> -->
</div>

<style>
    .background-gradient {
        background: linear-gradient(
            135deg,
            black,
            var(--color-astronaut-blue-950)
        );
    }
</style>