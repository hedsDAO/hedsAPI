import { Flex } from '@chakra-ui/react';

const PlayerButtons = () => {
  return (
    <Flex height="100%" bg="gray.200" w="full" gap={2} justifyContent="center" alignItems={'center'}>
      <i className="fa-sharp fa-solid fa-backward-step"></i>
      <i className="fa-sharp fa-solid fa-play"></i>
      <i className="fa-sharp fa-solid fa-forward-step"></i>
    </Flex>
  );
};

export default PlayerButtons;
