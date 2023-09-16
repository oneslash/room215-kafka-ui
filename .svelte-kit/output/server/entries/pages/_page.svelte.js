import { c as create_ssr_component, d as add_attribute, e as escape } from "../../chunks/ssr.js";
import "@tauri-apps/api/tauri";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let bootstrap = "";
  return `<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"><div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"><form class="space-y-6"><div><label for="bootstrap_string" class="block text-sm font-medium leading-6 text-gray-900" data-svelte-h="svelte-1i9or4u">Bootsrap String</label> <div class="mt-2"><input id="bootstrap_string" name="bootstrap_string" type="input" required class="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"${add_attribute("value", bootstrap, 0)}></div></div> <div><div class="flex items-center justify-between" data-svelte-h="svelte-1i1c1th"><label for="configs" class="block text-sm font-medium leading-6 text-gray-900">Configs</label></div> <div class="mt-2"><textarea id="configs" name="configs" required class="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">${escape("")}</textarea></div></div> <div data-svelte-h="svelte-o4te5l"><button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button></div></form> ${``}</div></div>`;
});
export {
  Page as default
};
