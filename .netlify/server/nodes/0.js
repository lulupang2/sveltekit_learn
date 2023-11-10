import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.f3f3fe20.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.db659e48.js","_app/immutable/chunks/index.b7b36c7e.js","_app/immutable/chunks/scheduler.975058b2.js","_app/immutable/chunks/index.74b90ee2.js","_app/immutable/chunks/stores.d7810396.js","_app/immutable/chunks/stores.f603bbbc.js"];
export const stylesheets = ["_app/immutable/assets/0.10a71524.css","_app/immutable/assets/ProgressBar.4f1e9ba5.css"];
export const fonts = [];
