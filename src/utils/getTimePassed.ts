const getTimePassed = (timestamp: string): string => {
  const date = new Date(timestamp);
  const currentDate = new Date();
  const difference = currentDate.getTime() - date.getTime();
  const daysPassed = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (daysPassed >= 365) {
    const years = Math.floor(daysPassed / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } else if (daysPassed >= 30) {
    const months = Math.floor(daysPassed / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (daysPassed >= 7) {
    const weeks = Math.floor(daysPassed / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (daysPassed >= 1) {
    return `${daysPassed} day${daysPassed > 1 ? 's' : ''} ago`;
  } else {
    return 'today';
  }
};

export default getTimePassed;
