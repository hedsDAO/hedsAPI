import { useEffect } from 'react';
import { Image, Wrap, WrapItem } from '@chakra-ui/react';

interface OwnProps {
  appearsOn: string[];
}

const imageLinks = Array(10).fill(
  'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F2.png?alt=media&token=b37ac39b-243e-411f-820f-17c9b8e454df',
);

export const AppearsOnTab = () => {
  // useEffect(() => {
  //   // fetch each tape Id image
  // }, []);

  return (
    <Wrap spacing="2rem">
      {imageLinks.map((tape, idx) => (
        <WrapItem key={`${tape}${idx}`}>
          <Image src={tape} alt="Tape cover" boxSize="230px" />
        </WrapItem>
      ))}
    </Wrap>
  );
};
