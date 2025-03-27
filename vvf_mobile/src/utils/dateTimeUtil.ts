import dayjs from 'dayjs';

export const dateToString = (date: Date | null, dateFormat: string) =>
  date != null ? dayjs(date).format(dateFormat) : '';

const timeToDate = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  return dayjs().hour(hour).minute(minute).second(0);
};

export const calculateMinute = (to: string, from: string) => {
  const toDate = timeToDate(to);
  const fromDate = timeToDate(from);

  if (!toDate.isValid() || !fromDate.isValid()) {
    return 'N/A';
  }

  const result = fromDate.diff(toDate, 'minute');
  return result;
};
