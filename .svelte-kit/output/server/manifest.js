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
		client: {"start":"_app/immutable/entry/start.74def9c6.js","app":"_app/immutable/entry/app.34b0770d.js","imports":["_app/immutable/entry/start.74def9c6.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/singletons.5bc53027.js","_app/immutable/entry/app.34b0770d.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.c6da1de8.js"],"stylesheets":[],"fonts":[]},
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
