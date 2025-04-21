<script lang="ts">
    interface Props {
        headers?: Array<string>;
        user?: Array<string>;
        type?: Array<string>;
    }

    let { headers = [], user = [], type = [] }: Props = $props();
</script>

<div class="border-1 shadow-xl border-gray-600 overflow-hidden rounded-md">
  <table class="">
      <thead>
          <tr>
              {#each headers as header}
                  <th class="border-r border-gray-600 last:border-r-0 px-12 py-4 bg-slate-800 odd:bg-slate-900 text-white">{header}</th>
              {/each}
          </tr>
      </thead>
      <tbody class="backdrop-blur-md text-white bg-black/25">
          {#each user as username, i}
            <tr>
                <td class="text-left px-4 py-2 border-b border-r border-gray-600">
                    <img class="w-8 h-8 m-2 rounded-4xl inline border-2 border-white rounded-" src="img/User.png" alt="user"/>
                    {username}
                </td>
                <td class="text-left px-4 py-2 border-b border-r last:border-r-0 border-gray-600">
                    {type[i]}
                </td>
            </tr>
          {/each}
      </tbody>
  </table>
</div>