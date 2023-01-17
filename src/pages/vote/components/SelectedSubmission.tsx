import { Avatar, Box, Flex, HStack, Stack, Text, IconButton } from '@chakra-ui/react';
import { IconX } from '@tabler/icons';
import { Choice } from 'hedsvote';

interface OwnProps {
  choice: Choice;
  handleRemoveSubmission: (choice: Choice) => void;
}

export const SelectedSubmission = ({ choice, handleRemoveSubmission }: OwnProps) => {
  return (
    <Flex p={2} border="1px" rounded="sm" shadow="sm" borderColor="gray.500" w="full" minW="full" gap={2} key={choice.name}>
      <HStack spacing="4" direction="row" justify="space-between" w="full">
        <Stack spacing="1">
          <Avatar size="xs" src={choice.image} />
          <Text textColor={'gray.800'} fontSize={'xs'}>
            {choice.name}
          </Text>
        </Stack>
        <IconButton aria-label="Remove Submission" size="xs" colorScheme="red" icon={<IconX />} onClick={() => handleRemoveSubmission(choice)} />
      </HStack>
    </Flex>
  );
};
