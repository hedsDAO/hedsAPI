import { Button, HStack, Stack, Text } from '@chakra-ui/react';

export const TimelineButtons = () => {
  return (
    <Stack>
      <HStack>
        <Text color="#9293FF" fontFamily="sans-serif">
          Submit
        </Text>
        <i className="fa-solid fa-lock-keyhole" style={{ color: '#F02A2A' }} />
        <Text color="white" fontFamily="sans-serif" fontSize="xs">
          {currentTape?.timeline?.submit?.start}
        </Text>
      </HStack>
      <Button
        bgColor="#745CBA"
        color="white"
        fontFamily="sans-serif"
        fontWeight="light"
        leftIcon={<i className="fa-solid fa-arrow-down-to-line" />}
        fontSize="xs"
      >
        UPLOAD SUBMISSION
      </Button>
      <HStack>
        <Text color="#9293FF" fontFamily="sans-serif">
          Vote
        </Text>
        <i className="fa-solid fa-lock-keyhole-open" style={{ color: '#05FF00' }} />
        <Text color="white" fontFamily="sans-serif" fontSize="xs">
          {currentTape?.timeline?.submit?.start}
        </Text>
      </HStack>
      <Button bgColor="#745CBA" color="white" fontFamily="sans-serif" fontWeight="light" fontSize="xs">
        VOTE NOW
      </Button>
      <HStack>
        <Text color="#9293FF" fontFamily="sans-serif">
          Mint
        </Text>
        <Text color="white" fontFamily="sans-serif" fontSize="xs">
          {currentTape?.timeline?.submit?.start}
        </Text>
      </HStack>
      <Button bgColor="#745CBA" color="white" fontFamily="sans-serif" fontWeight="light" leftIcon={<i className="fa-solid fa-bell" />} fontSize="xs">
        GET NOTIFIED
      </Button>
    </Stack>
  );
};
