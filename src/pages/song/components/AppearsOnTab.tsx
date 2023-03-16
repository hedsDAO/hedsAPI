import { useEffect } from 'react';

interface OwnProps {
  appearsOn?: string[];
}

export const AppearsOnTab = ({ appearsOn }: OwnProps) => {
  useEffect(() => {
    // fetch each tape Id image
  }, [appearsOn]);
};
