import { useEffect } from 'react';

interface OwnProps {
  likedBy: { [key: string]: number };
}

export const LikesTab = ({ likedBy }: OwnProps) => {
  useEffect(() => {
    // iterate through likedBy
  }, []);
};
