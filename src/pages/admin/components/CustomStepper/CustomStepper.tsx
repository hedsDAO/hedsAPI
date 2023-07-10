import { Box, Center, Divider, Text } from '@chakra-ui/react';

interface OwnProps {
  steps: string[];
  currentStep: number;
}

export const CustomStepper = ({ steps, currentStep }: OwnProps) => {
  return (
    <Box display="flex" flexDirection="column">
      {steps.map((step, index) => (
        <Box key={index}>
          <Box
            border="2px solid white"
            borderRadius="md"
            bg={currentStep === index ? 'white' : '#17151C'}
            color={currentStep === index ? '#17151C' : 'white'}
            padding="2"
          >
            <Text fontFamily="space" fontWeight="bold" fontSize="xs" textAlign="center">
              {step}
            </Text>
          </Box>
          {index < steps.length - 1 && (
            <Center height="30px">
              <Divider orientation="vertical" borderWidth="1px" borderColor="white" />
            </Center>
          )}
        </Box>
      ))}
    </Box>
  );
};
