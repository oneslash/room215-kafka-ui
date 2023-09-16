import { c as create_ssr_component, f as each, e as escape } from "../../../chunks/ssr.js";
import { invoke } from "@tauri-apps/api/tauri";
import { g as getFromLocalStorage } from "../../../chunks/local-storage.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let topics = [];
  async function list_topics() {
    let bootstrap = getFromLocalStorage("bootstrap");
    let configs = getFromLocalStorage("configs");
    await invoke("list_topics", { bootstrap, configs }).then((res) => {
      topics = res;
    });
  }
  list_topics();
  return `<div class="min-h-full"><header class="bg-white shadow" data-svelte-h="svelte-1z0wfpo"><div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"><h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1></div></header> <div class="flex flex-col"><div class="overflow-x-auto"><div class="p-1.5 min-w-full inline-block align-middle"><div class="overflow-hidden"><table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"><thead data-svelte-h="svelte-1ut1911"><tr><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Partitions</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Replication Factor</th> <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th></tr></thead> <tbody class="divide-y divide-gray-200 dark:divide-gray-700">${each(topics, (topic) => {
    return `<tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">${escape(topic.name)}</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">${escape(topic.partitions)}</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">${escape(topic.replication)}</td> <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><a class="text-blue-500 hover:text-blue-700" href="${"/ui/topic/?topic=" + escape(topic.name, true)}">View</a></td> </tr>`;
  })}</tbody></table></div></div></div></div></div>`;
});
export {
  Page as default
};
