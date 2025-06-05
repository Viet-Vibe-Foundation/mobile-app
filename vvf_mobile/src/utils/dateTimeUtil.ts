import dayjs from 'dayjs';

export const dateToString = (date: Date | null, dateFormat: string) =>
  date != null ? dayjs(date).format(dateFormat) : '';

const timeToDate = (time: string, baseDate: dayjs.Dayjs) => {
  const [hour, minute] = time.split(':').map(Number);
  return baseDate.hour(hour).minute(minute).second(0);
};

export const calculateMinute = (from: string, to: string): string => {
  const today = dayjs();

  let fromDate = timeToDate(from, today);
  let toDate = timeToDate(to, today);

  if (!toDate.isValid() || !fromDate.isValid()) {
    return 'N/A';
  }

  if (toDate.isBefore(fromDate)) {
    toDate = toDate.add(1, 'day');
  }

  const result = toDate.diff(fromDate, 'minute');

  const hours = Math.floor(result / 60);
  const minutes = result % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  return `${hours}h:${minutes}m`;
};
