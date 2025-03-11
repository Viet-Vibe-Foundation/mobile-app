import dayjs from 'dayjs';

export const dateToString = (date: Date | null) =>
  date != null ? dayjs(date).format('DD/MM/YYYY h:mm a') : '';

const timeToDate = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  return dayjs().hour(hour).minute(minute).second(0);
};

export const calculateMinute = (to: string, from: string) => {
  const toDate = timeToDate(to);
  const fromDate = timeToDate(from);

  if (!toDate.isValid() || !fromDate.isValid()) {
    console.error('Invalid date format');
    return 'N/A';
  }

  const result = fromDate.diff(toDate, 'minute');
  console.log(`Difference in minutes: ${result}`);
  return result;
};
