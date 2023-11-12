import { getToastStore } from '@skeletonlabs/skeleton';

export const toastStore = getToastStore();
export function showToast(toast) {
	toastStore.trigger(toast);
}
