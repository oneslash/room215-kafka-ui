

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/ui/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.b597fa99.js","_app/immutable/chunks/scheduler.e903ca9d.js","_app/immutable/chunks/index.1b9b1e3c.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/local-storage.55ddb8bb.js"];
export const stylesheets = [];
export const fonts = [];
