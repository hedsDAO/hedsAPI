import { TimelineStatus } from '@/pages/listen/store/hedstapeModel';

const compareTimestamps = (now: number, start: number, end: number) => {
  if (now > start && now < end) return TimelineStatus.CURRENT;
  if (now < start) return TimelineStatus.PENDING;
  if (now > end) return TimelineStatus.CLOSED;
};

export default compareTimestamps;
