import * as universal from '../entries/pages/board/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/board/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/board/+page.js";
export const imports = ["_app/immutable/nodes/3.0eb24725.js","_app/immutable/chunks/api.4e77d478.js","_app/immutable/chunks/scheduler.975058b2.js","_app/immutable/chunks/index.b7b36c7e.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.db659e48.js","_app/immutable/chunks/index.74b90ee2.js","_app/immutable/chunks/utils.acb5c53c.js"];
export const stylesheets = ["_app/immutable/assets/3.a00c218d.css","_app/immutable/assets/ProgressBar.4f1e9ba5.css"];
export const fonts = [];
