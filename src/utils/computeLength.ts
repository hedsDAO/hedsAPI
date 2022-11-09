const computeLength = (file: File): Promise<{ file: File; duration: number }> => {
  return new Promise((resolve) => {
    const objectURL = URL.createObjectURL(file);
    // @ts-ignore
    const mySound = new Audio([objectURL]);
    mySound.addEventListener(
      'canplaythrough',
      () => {
        URL.revokeObjectURL(objectURL);
        resolve({
          file,
          duration: mySound.duration,
        });
      },
      false,
    );
  });
};

export default computeLength;
