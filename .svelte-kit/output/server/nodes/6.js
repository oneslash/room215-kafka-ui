

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/ui/topic/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.efc2064a.js","_app/immutable/chunks/scheduler.e903ca9d.js","_app/immutable/chunks/index.1b9b1e3c.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/stores.c388f86c.js","_app/immutable/chunks/singletons.2b2f2c9a.js","_app/immutable/chunks/local-storage.55ddb8bb.js"];
export const stylesheets = [];
export const fonts = [];
