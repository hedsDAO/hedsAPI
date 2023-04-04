import { Box, Button, Flex, Text } from '@chakra-ui/react';

const ArrowButton = ({ text }: { text: string }) => {
  return (
    <Box>
      <Button _hover={{ bg: 'transparent' }} p={0} bg="transparent" color="blackAlpha.900" pt={1} gap={3} alignItems={'center'} as={Flex}>
        <Text color="blackAlpha.800" letterSpacing={'widest'} fontSize="xs" textTransform={'uppercase'}>
          {text}
        </Text>
        <i className="fa-solid fa-arrow-right"></i>
      </Button>
    </Box>
  );
};

export default ArrowButton;
