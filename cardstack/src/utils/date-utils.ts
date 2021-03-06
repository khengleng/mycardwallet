import { format } from 'date-fns';

const calculateTimestampOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);

  return d.getTime();
};

const calculateTimestampOfYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  d.setHours(0, 0, 0, 0);

  return d.getTime();
};

const calculateTimestampOfThisMonth = () => {
  const d = new Date();
  d.setDate(0);
  d.setHours(0, 0, 0, 0);

  return d.getTime();
};

const calculateTimestampOfThisYear = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear(), 0, 1);
  d.setHours(0, 0, 0, 0);

  return d.getTime();
};

const todayTimestamp = calculateTimestampOfToday();
const yesterdayTimestamp = calculateTimestampOfYesterday();
const thisMonthTimestamp = calculateTimestampOfThisMonth();
const thisYearTimestamp = calculateTimestampOfThisYear();

export const groupTransactionsByDate = (transaction: {
  timestamp?: string;
  minedAt?: string;
  createdAt?: string;
}) => {
  const timeStamp =
    transaction.timestamp || transaction.minedAt || transaction.createdAt || '';

  const ts = parseInt(timeStamp, 10) * 1000;

  if (ts > todayTimestamp) return 'Today';
  if (ts > yesterdayTimestamp) return 'Yesterday';
  if (ts > thisMonthTimestamp) return 'This Month';

  return format(ts, `MMMM${ts > thisYearTimestamp ? '' : ' yyyy'}`);
};
