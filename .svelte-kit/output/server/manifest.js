export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.d80d5016.js","app":"_app/immutable/entry/app.9123bc91.js","imports":["_app/immutable/entry/start.d80d5016.js","_app/immutable/chunks/scheduler.e903ca9d.js","_app/immutable/chunks/singletons.2b2f2c9a.js","_app/immutable/entry/app.9123bc91.js","_app/immutable/chunks/scheduler.e903ca9d.js","_app/immutable/chunks/index.1b9b1e3c.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
