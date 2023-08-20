import { c as create_ssr_component, d as add_attribute, e as escape } from "../../chunks/ssr.js";
import "@tauri-apps/api/tauri";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "html{background-color:#f3f4f6}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let name = "";
  let greetMsg = "";
  $$result.css.add(css);
  return `<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"><div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"><form class="space-y-6"><div><label for="bootstrap_string" class="block text-sm font-medium leading-6 text-gray-900" data-svelte-h="svelte-1i9or4u">Bootsrap String</label> <div class="mt-2"><input id="bootstrap_string" name="bootstrap_string" type="input" required class="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"${add_attribute("value", name, 0)}></div></div> <div data-svelte-h="svelte-gqmfpb"><div class="flex items-center justify-between"><label for="configs" class="block text-sm font-medium leading-6 text-gray-900">Configs</label></div> <div class="mt-2"><textarea id="configs" name="configs" required class="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea></div></div> <div><button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" data-svelte-h="svelte-5huvpk">Sign in</button></div></form></div> <p>${escape({ greetMsg })}</p> </div>`;
});
export {
  Page as default
};
