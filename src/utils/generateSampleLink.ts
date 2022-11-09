const generateSampleLink = (id: string) => {
  if (id === `6`) return `samples/HT${id}.zip`;
  return `samples/HT${id}.mp3`;
};

export default generateSampleLink;
