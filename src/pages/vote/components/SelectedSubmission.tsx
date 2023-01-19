// Components
import { Avatar, Box, Grid, GridItem, HStack, Stack, Text, IconButton } from '@chakra-ui/react';
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
    <Box p={2} border="1px" rounded="md" shadow="sm" borderColor="gray.500" w="full" minW="full" key={choice.name}>
      <Grid templateColumns="repeat(3, 1fr)" gap="5">
        <GridItem>
          <Stack spacing="1">
            <Avatar size="md" src={choice.image} />
            <Text textColor={'gray.800'} fontSize="sm">
              {choice.name}
            </Text>
          </Stack>
        </GridItem>

        <GridItem alignSelf="center">
          <HStack justifyContent="center">
            <IconButton aria-label="Subtract" icon={<IconMinus />} onClick={() => handleScoreChange(choice, 'subtract')} />
            <Text>{choice.score}</Text>
            <IconButton aria-label="Add" icon={<IconPlus />} onClick={() => handleScoreChange(choice, 'add')} />
          </HStack>
        </GridItem>

        <GridItem justifySelf="flex-end">
          <IconButton aria-label="Remove Submission" size="xs" colorScheme="red" icon={<IconX />} onClick={() => handleRemoveSubmission(choice)} />
        </GridItem>
      </Grid>
    </Box>
  );
};
