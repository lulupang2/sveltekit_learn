

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/chat/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.cb91ee85.js","_app/immutable/chunks/scheduler.975058b2.js","_app/immutable/chunks/index.b7b36c7e.js"];
export const stylesheets = [];
export const fonts = [];
