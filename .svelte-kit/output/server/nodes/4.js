

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.7022d55d.js","_app/immutable/chunks/scheduler.e903ca9d.js","_app/immutable/chunks/index.1b9b1e3c.js","_app/immutable/chunks/local-storage.55ddb8bb.js"];
export const stylesheets = [];
export const fonts = [];
