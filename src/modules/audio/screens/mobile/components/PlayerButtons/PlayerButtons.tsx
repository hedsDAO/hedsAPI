import { Flex } from '@chakra-ui/react';

const PlayerButtons = () => {
  return (
    <Flex bg="gray.200" w="full" gap={2} textAlign="center" justifyContent="center" alignItems={'center'}>
      <i className="fa-sharp fa-solid fa-backward-step"></i>
      <i className="fa-sharp fa-solid fa-play"></i>
      <i className="fa-sharp fa-solid fa-forward-step"></i>
    </Flex>
  );
};

export default PlayerButtons;
