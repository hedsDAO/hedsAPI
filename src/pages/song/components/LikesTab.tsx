import { useEffect } from 'react';
import { Avatar, AvatarGroup } from '@chakra-ui/react';
interface OwnProps {
  likedBy: { [key: string]: number };
}

const likesArray = Array(10).fill('https://www.heds.cloud/ipfs/Qmdyz7xSWZjDBBe9uRS8QU4NFRCP24zjExVJLS4mbkTshv');

export const LikesTab = () => {
  // useEffect(() => {
  //   // iterate through likedBy
  // }, []);

  return (
    <AvatarGroup>
      {likesArray.map((like, idx) => (
        <Avatar key={`${like}${idx}`} name="artist name" src={like} size="lg" />
      ))}
    </AvatarGroup>
  );
};
