import dayjs from 'dayjs';

export const dateToString = (date: Date | null) =>
  date != null ? dayjs(date).format('DD/MM/YYYY h:mm a') : '';
