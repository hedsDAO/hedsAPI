const compareTimestamps = (now: number, start: number, end: number) => {
  if (now > start && now < end) return 'current';
  if (now < start) return 'pending';
  if (now > end) return 'closed';
};

export default compareTimestamps;