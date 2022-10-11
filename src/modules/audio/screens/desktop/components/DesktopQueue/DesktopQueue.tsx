import {
  Flex,
  PopoverTrigger,
  Popover,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Stack,
  StackDivider,
  Avatar,
  Text,
  IconButton,
} from '@chakra-ui/react';

const DesktopQueue = () => {
  return (
    <Flex h="full" justifyContent={'center'} alignItems={'center'}>
      <Popover arrowPadding={16}>
        <PopoverTrigger>
          <IconButton
            aria-label="queue"
            icon={<i className="fa-sharp fa-solid fa-layer-group"></i>}
            className="hover:rotate-180 duration-500 ease-in-out"
            bg="transparent"
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Up Next</PopoverHeader>
          <PopoverBody>
            <Stack divider={<StackDivider />} fontSize="sm" px="2" spacing="0.5">
              <Flex alignItems="center">
                <Avatar size="sm" />
                <Flex direction="column">
                  <Text fontWeight="medium" color="emphasized">
                    Track Name
                  </Text>
                  <Text color="subtle">Artist Name</Text>
                </Flex>
              </Flex>
              <Flex alignItems="center">
                <Avatar size="sm" />
                <Flex direction="column">
                  <Text fontWeight="medium" color="emphasized">
                    Track Name
                  </Text>
                  <Text color="subtle">Artist Name</Text>
                </Flex>
              </Flex>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default DesktopQueue;
