<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import {
    saveToLocalStorage,
  } from "../lib/local-storage";

  let bootstrap = "";
  let configs = "";
  let error = "";

  async function login() {
    await invoke("login_ping", { bootstrap, configs })
      .then((_res: boolean) => {
        saveToLocalStorage("bootstrap", bootstrap);
        saveToLocalStorage("configs", configs);
        location.href = "/ui";
      })
      .catch((err: string) => {
        error = err;
      });
  }
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" on:submit|preventDefault={login}>
      <div>
        <label
          for="bootstrap_string"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Bootsrap String</label
        >
        <div class="mt-2">
          <input
            id="bootstrap_string"
            name="bootstrap_string"
            type="input"
            required
            class="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            bind:value={bootstrap}
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="configs"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Configs</label
          >
        </div>
        <div class="mt-2">
          <textarea
            id="configs"
            name="configs"
            required
            class="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            bind:value={configs}
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Sign in</button
        >
      </div>
    </form>
    {#if error != ""}
      <div role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4 mt-2">
        <strong class="block font-medium text-red-800">
          Something went wrong
        </strong>

        <p class="mt-2 text-sm text-red-700">
          {error}
        </p>
      </div>
    {/if}
  </div>
</div>
