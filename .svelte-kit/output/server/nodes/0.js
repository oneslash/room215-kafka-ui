import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.0dea4116.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.c6da1de8.js"];
export const stylesheets = ["_app/immutable/assets/0.7b65156c.css"];
export const fonts = [];
