import { AvatarProps, Avatar, useBoolean, Skeleton } from '@chakra-ui/react';

export const CustomHitImage = ({ name, src, title, styles }: { name: string; src: string; title: string; styles: AvatarProps }) => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();

  return (
    <Skeleton startColor="heds.bg2" endColor="heds.400" fitContent isLoaded={hasImageLoaded}>
      <Avatar onLoad={setHasImageLoaded.on} name={name} {...styles} src={src} title={title} />
    </Skeleton>
  );
};
