const formatTimestamp = (time: string) => {
  let newTime = time.replace('UTC', 'GMT-07:00').replace('at ', '').replace('AM ', '').replace('PM ', '');
  const [month, day, clockTime, timezone, utc] = newTime.split(' ');
  newTime = `${day} ${month} ${clockTime} ${timezone} ${utc}`.replace(',', '');
  return newTime;
};

export default formatTimestamp;
