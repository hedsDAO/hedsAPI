import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ViewTapesButton = () => {
  return (
    <Flex maxW={'7xl'} mx={'auto'} px={[4, 3, 2, 1]} mb={2}>
      <Flex className="group" width={'fit-content'} alignItems={'center'}>
        <i className="fa-regular fa-arrow-left group-hover:mr-3 mr-2 ease-in-out transition-all text-sm" />
        <Text className="relative bottom-[1px]" to={'/tapes'} as={Link} fontSize={'xs'}>
          view all tapes
        </Text>
      </Flex>
    </Flex>
  );
};

export default ViewTapesButton;
