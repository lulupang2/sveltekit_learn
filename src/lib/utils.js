import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');
export function formatDate(date) {
	const today = dayjs();
	const inputDate = dayjs(date);

	if (inputDate.isSame(today, 'day')) {
		return inputDate.format('HH:mm');
	} else {
		return inputDate.format('MM-DD');
	}
}

export function postDate(date) {
	return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

export function historyBackHandler() {
	addEventListener('popstate', (event) => {
		if (event.state && this.enabled) {
			const url = new URL(location.href);
			const info = this.parse(url);
			if (info) {
				this._navigate(info, event.state['sveltekit:scroll'], []);
			} else {
				// eslint-disable-next-line
				location.href = location.href; // nosonar
			}
		}
	});
}
