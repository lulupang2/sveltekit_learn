

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/board/write/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.0f03bc04.js","_app/immutable/chunks/scheduler.975058b2.js","_app/immutable/chunks/index.b7b36c7e.js","_app/immutable/chunks/navigation.20c5e74b.js","_app/immutable/chunks/singletons.f8fb5f10.js","_app/immutable/chunks/index.74b90ee2.js","_app/immutable/chunks/api.4e77d478.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.db659e48.js","_app/immutable/chunks/stores.d7810396.js"];
export const stylesheets = ["_app/immutable/assets/5.64850250.css","_app/immutable/assets/ProgressBar.4f1e9ba5.css"];
export const fonts = [];
