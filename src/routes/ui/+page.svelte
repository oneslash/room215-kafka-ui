<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { getFromLocalStorage } from "../../lib/local-storage";

  let topics = [];
  async function list_topics() {
    let bootstrap = getFromLocalStorage("bootstrap");
    let configs = getFromLocalStorage("configs");
    topics = await invoke("list_topics", { bootstrap, configs });
    console.log(topics);
  }

  $: {
  }
</script>

<div class="min-h-full">
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <button on:click={list_topics}>List Topics</button>
      <table class="min-w-full text-left text-sm font-light">
        <thead class="border-b font-medium dark:border-neutral-500" >
          <tr class="px-6 py-4">
            <th>Topic Name</th>
          </tr>
        </thead>
        <tbody>
          {#each topics as topic}
            <tr class="border-b dark:border-neutral-500">
              <td>{topic}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </main>
</div>
