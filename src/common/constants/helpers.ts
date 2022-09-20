export const convertSecondsToMinutes = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.round(duration - minutes * 60);

  return addZeroToLeft(minutes.toString()) + ':' + addZeroToLeft(seconds.toString());
};

const addZeroToLeft = (str: string): string => {
  return (new Array(2).join('0') + str).slice(-2);
};
