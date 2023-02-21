import { Box, Center, Container, Stack } from '@chakra-ui/react';
import { Step } from './Step';
import { useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';

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
  const dividerSprings = steps.map(() => {
    return useSpring(() => ({
      from: {
        height: '0%',
      },
    }));
  });

  const iconSprings = steps.map(() => {
    return {
      dashed: useSpring(() => ({
        from: {
          opacity: 1,
        },
      })),
      check: useSpring(() => ({
        from: {
          opacity: 0,
        },
      })),
    };
  });

  const textSprings = steps.map(() => {
    return useSpring(() => ({
      from: {
        color: '#000000',
      },
    }));
  });

  return (
    <Box bg="bg-surface" paddingTop={['2rem', '5rem']} padding={['1rem', null]}>
      <Container py={{ base: '4', md: '8' }}>
        <Center>
          <Waypoint
            onEnter={() => {
              iconSprings.forEach(({ dashed, check }, i) => {
                const dashedApi = dashed[1];
                const checkApi = check[1];

                dashedApi.start({
                  to: { opacity: 0 },
                  config: {
                    tension: 25,
                  },
                  delay: 500 + i ** 1.3 * 1500,
                });
                checkApi.start({
                  to: { opacity: 1 },
                  config: {
                    tension: 25,
                  },
                  delay: 1000 + i ** 1.3 * 1500,
                });
              });

              textSprings.forEach(([props, api], i) => {
                api.start({
                  to: {
                    color: '#FAF9F6',
                  },
                  delay: 1200 + i ** 1.3 * 1500,
                  config: {
                    tension: 20,
                  },
                });

                dividerSprings.forEach(([props, api], i) => {
                  api.start({
                    to: { height: '100%' },
                    delay: 1500 + i * 2500,
                    config: {
                      tension: 50,
                    },
                  });
                });
              });
            }}
          >
            <Stack spacing="0">
              {steps.map((step, id) => (
                <Step
                  key={id}
                  title={step.name}
                  description={step.description}
                  isLastStep={steps.length === id + 1}
                  dividerProps={dividerSprings[id][0]}
                  dashedProps={iconSprings[id].dashed[0]}
                  checkProps={iconSprings[id].check[0]}
                  textProps={textSprings[id][0]}
                />
              ))}
            </Stack>
          </Waypoint>
        </Center>
      </Container>
    </Box>
  );
};
