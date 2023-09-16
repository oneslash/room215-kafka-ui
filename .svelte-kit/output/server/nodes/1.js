

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.ba67ac63.js","_app/immutable/chunks/scheduler.e903ca9d.js","_app/immutable/chunks/index.1b9b1e3c.js","_app/immutable/chunks/stores.c388f86c.js","_app/immutable/chunks/singletons.2b2f2c9a.js"];
export const stylesheets = [];
export const fonts = [];
