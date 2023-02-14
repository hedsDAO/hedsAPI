import { Box, Center, Container, Stack } from '@chakra-ui/react';
import { Step } from './Step';
import { useStep } from './useStep';

const steps = [
  {
    name: 'Sample',
    description:
      'A sample is provided by an artist and made available for download on the site. Artists can download the sample stems and must use at least 1 second of the sample in their submissions.',
  },
  {
    name: 'Submissions',
    description:
      'Artists create and submit their own tracks conforming only with the bpm and using at least 1 second of the sample. Submissions should be between 60 and 70 seconds as the final submissions will be mixed into the final tape.',
  },
  {
    name: 'Vote',
    description:
      'The community votes on their favorite submissions. Voting power is determined from hedsTAPE(s) ownership. hedsTAPE(s) with a higher ratio of owners to tapes minted in the specific collection will have a higher voting power.',
  },
  {
    name: 'Curation',
    description:
      'The 20 submissions with the most votes will then be sent to the sample curator who will then select the final 10 submissions for the tape. If this number is less than 20, the curation step will move to the sample provider and ETH from the treasury will be distributed evenly to those who submitted.',
  },
  {
    name: 'Mint',
    description: 'The artists on the tape receive 75% of the initial mint, the remaining 25% goes to the treasury.',
  },
];

export const Stepper = () => {
  const [currentStep, { setStep }] = useStep({ maxStep: steps.length, initialStep: 2 });
  return (
    <Box bg="bg-surface">
      <Container py={{ base: '4', md: '8' }}>
        <Center>
          <Stack spacing="0">
            {steps.map((step, id) => (
              <Step
                key={id}
                cursor="pointer"
                onClick={() => setStep(id)}
                title={step.name}
                description={step.description}
                isCompleted={currentStep > id}
                isLastStep={steps.length === id + 1}
                multiplier={id}
              />
            ))}
          </Stack>
        </Center>
      </Container>
    </Box>
  );
};
