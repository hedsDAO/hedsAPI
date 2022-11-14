import { DateCountdown } from '@/common/tape';
import { Box, Flex, Text } from '@chakra-ui/react';

const PrimaryAlert = ({ countdown, children }: { countdown: number; children: any }) => {
  return (
    <Box w="full" as={Flex} alignItems={'center'} bgColor={'green.100'} borderColor={'green.200'} rounded="lg" className="py-2 px-3 border">
      <i className={`fa-sharp fa-solid fa-circle-info text-sm ${children && 'mr-2'}`}></i>
      <Flex gap={2} alignItems={{ base: 'center', lg: 'baseline' }}>
        <Text
          textAlign={{ lg: 'left' }}
          display={{ base: 'none', lg: 'inline' }}
          fontSize={{ base: 'xs', lg: 'sm' }}
          textColor={'gray.700'}
          fontWeight={'light'}
        >
          {children}
        </Text>
        <DateCountdown deadline={countdown} />
      </Flex>
    </Box>
  );
};
export default PrimaryAlert;
