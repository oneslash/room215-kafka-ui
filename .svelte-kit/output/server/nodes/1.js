

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.4db316d6.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.c6da1de8.js","_app/immutable/chunks/singletons.5bc53027.js"];
export const stylesheets = [];
export const fonts = [];
