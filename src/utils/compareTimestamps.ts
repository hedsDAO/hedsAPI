import { TimelineStatus } from '@/pages/listen/store/hedstapeModel';

const compareTimestamps = (now: number, start: number, end: number) => {
  if (now > start && now < end) return TimelineStatus.OPEN;
  if (now < start) return TimelineStatus.UPCOMING;
  if (now > end) return TimelineStatus.CLOSED;
};

export default compareTimestamps;
