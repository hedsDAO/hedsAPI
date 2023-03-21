import { useEffect } from 'react';
import { Avatar } from '@chakra-ui/react';
interface OwnProps {
  likedBy: { [key: string]: number };
}

export const LikesTab = () => {
  // useEffect(() => {
  //   // iterate through likedBy
  // }, []);

  return <Avatar name="artist name" src="https://www.heds.cloud/ipfs/Qmdyz7xSWZjDBBe9uRS8QU4NFRCP24zjExVJLS4mbkTshv" />;
};
