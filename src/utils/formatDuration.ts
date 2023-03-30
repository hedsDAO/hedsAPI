const formatDuration = (duration: number): string => {
    const seconds = Math.round(duration);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
};

export default formatDuration;
