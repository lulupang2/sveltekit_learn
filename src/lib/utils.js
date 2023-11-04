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
