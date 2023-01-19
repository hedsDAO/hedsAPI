import { useState } from 'react';
// Components
import { Avatar, Flex, HStack, Stack, Text, IconButton } from '@chakra-ui/react';
import { IconX, IconPlus, IconMinus } from '@tabler/icons';

// Models
import { SubmissionChoice } from '../store/voteModel';

interface OwnProps {
  choice: SubmissionChoice;
  handleRemoveSubmission: (choice: SubmissionChoice) => void;
  handleScoreChange: (choice: SubmissionChoice, type: string) => void;
}

export const SelectedSubmission = ({ choice, handleRemoveSubmission, handleScoreChange }: OwnProps) => {
  return (
    <Flex p={2} border="1px" rounded="sm" shadow="sm" borderColor="gray.500" w="full" minW="full" gap={2} key={choice.name}>
      <HStack spacing="4" direction="row" justify="space-between" w="full">
        <Stack spacing="1">
          <Avatar size="xs" src={choice.image} />
          <Text textColor={'gray.800'} fontSize={'xs'}>
            {choice.name}
          </Text>
        </Stack>
        <HStack>
          <IconButton aria-label="Subtract" icon={<IconMinus />} onClick={() => handleScoreChange(choice, 'subtract')} />
          <Text>{choice.score}</Text>
          <IconButton aria-label="Add" icon={<IconPlus />} onClick={() => handleScoreChange(choice, 'add')} />
        </HStack>
        <IconButton aria-label="Remove Submission" size="xs" colorScheme="red" icon={<IconX />} onClick={() => handleRemoveSubmission(choice)} />
      </HStack>
    </Flex>
  );
};
