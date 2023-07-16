import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const dateTransform = (date) => {
  const dateObject = dayjs(date);
  return dateObject.format('YYYY-MM-DD');
};

export default dateTransform;
