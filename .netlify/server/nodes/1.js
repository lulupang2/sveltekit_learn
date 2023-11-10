

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.44e5ce53.js","_app/immutable/chunks/scheduler.975058b2.js","_app/immutable/chunks/index.b7b36c7e.js","_app/immutable/chunks/singletons.f8fb5f10.js","_app/immutable/chunks/index.74b90ee2.js"];
export const stylesheets = [];
export const fonts = [];
