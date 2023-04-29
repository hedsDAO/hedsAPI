import { Text } from '@chakra-ui/react';

export const CloseButton = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Text
      pointerEvents={'auto'}
      role="button"
      fontSize="sm"
      right={0}
      m={2}
      position={'absolute'}
      color="white"
      opacity={'75%'}
      as={'i'}
      onClick={handleClose}
      className="fa-solid fa-xmark"
    />
  );
};
