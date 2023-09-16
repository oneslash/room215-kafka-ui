import * as server from '../entries/pages/ui/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/ui/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.87a7c6e1.js","_app/immutable/chunks/3.d226d9fb.js","_app/immutable/chunks/scheduler.e903ca9d.js","_app/immutable/chunks/index.1b9b1e3c.js"];
export const stylesheets = [];
export const fonts = [];
