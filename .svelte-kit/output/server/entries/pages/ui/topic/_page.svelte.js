import { c as create_ssr_component, e as escape, f as each } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/tauri";
import { g as getFromLocalStorage } from "../../../../chunks/local-storage.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const urlParams = new URLSearchParams(window.location.search);
  const topicParam = urlParams.get("topic");
  if (!topicParam) {
    page.set("/ui/");
  }
  let topics = [];
  async function list_events() {
    let bootstrap = getFromLocalStorage("bootstrap");
    let configs = getFromLocalStorage("configs");
    let topic = topicParam;
    await invoke("get_events", { bootstrap, configs, topic }).then((res) => {
      console.log(res);
    });
  }
  list_events();
  listen("topics", (event) => {
    console.log(event);
    topics = [
      ...topics,
      {
        key: event.payload.key,
        value: event.payload.value
      }
    ];
  });
  return `<div class="min-h-full"><header class="bg-white shadow"><div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"><h1 class="text-3xl font-bold tracking-tight text-gray-900">View ${escape(topicParam)}</h1> <a href="/ui/" class="text-base font-medium text-blue-900 hover:text-blue-400" data-svelte-h="svelte-1nj4ocx">Back</a>  </div></header> <div class="flex flex-col"><div class="overflow-x-auto"><div class="p-1.5 min-w-full inline-block align-middle"><div class="overflow-hidden"><table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"><thead data-svelte-h="svelte-1pahbwg"><tr><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Key</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">JSON</th></tr></thead> <tbody class="divide-y divide-gray-200 dark:divide-gray-700">${each(topics, (topic) => {
    return `<tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"><code>${escape(topic.key)}</code></td> <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><div class="break-all">${escape(JSON.stringify(topic.value))}</div></td> </tr>`;
  })}</tbody></table></div></div></div></div></div>`;
});
export {
  Page as default
};
