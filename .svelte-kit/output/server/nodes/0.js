import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.7b9836c5.js","_app/immutable/chunks/scheduler.e903ca9d.js","_app/immutable/chunks/index.1b9b1e3c.js"];
export const stylesheets = ["_app/immutable/assets/0.36637b04.css"];
export const fonts = [];
