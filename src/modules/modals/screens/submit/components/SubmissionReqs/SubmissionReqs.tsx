import { Dispatch, store } from '@/store';
import { AccordionButton, AccordionItem, AccordionPanel, Box, Checkbox, Flex, Stack, Text } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SubmissionRs = () => {
  const dispatch = useDispatch<Dispatch>();
  const bpm = useSelector(store.select.tapesModel.selectCurrentTapeBpm);
  const hasAcceptedTerms = useSelector(store.select.submitModel.selectHasAcceptedTerms);
  return (
    <AccordionItem pt={1} borderColor="transparent">
      <AccordionButton
        rounded="lg"
        _hover={hasAcceptedTerms ? { bg: 'green.100' } : {}}
        border="1px"
        borderColor={hasAcceptedTerms ? 'green.200' : 'gray.300'}
        bg={hasAcceptedTerms ? 'green.100' : 'gray.100'}
        onClick={() => dispatch.submitModel.setIndex(0)}
        fontSize="sm"
        fontWeight="semibold"
        shadow="sm"
      >
        1. Submission Requirements
      </AccordionButton>
      <AccordionPanel>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: '5', lg: '8' }} justify="space-between">
          <Box>
            <Flex gap={2} py={5} direction={{ base: 'column', lg: 'row' }}>
              <Flex border="1px" borderColor="red.200" rounded="lg" shadow="sm" p={3} alignItems="center" bg="red.100">
                <Text textAlign={'center'} color="muted" fontSize="xs">
                  Submissions must be <span style={{ fontWeight: 'bold' }}>{bpm} BPM and between 60 and 90 seconds</span> in length.
                </Text>
              </Flex>
              <Flex border="1px" borderColor="teal.200" rounded="lg" shadow="sm" p={3} alignItems="center" bg="teal.100">
                <Text textAlign={'center'} color="muted" fontSize="xs">
                  Submissions must be original and <span style={{ fontWeight: 'bold' }}>not contain any copyrighted content.</span>
                </Text>
              </Flex>
              <Flex border="1px" borderColor="orange.200" rounded="lg" shadow="sm" p={3} alignItems="center" bg="orange.100">
                <Text textAlign={'center'} color="muted" fontSize="xs">
                  Any submission that does not meet these requirements will be subject to disqualification.
                </Text>
              </Flex>
            </Flex>
            <Checkbox mt={3} onChange={() => dispatch.submitModel.toggleHasAcceptedTerms(!hasAcceptedTerms)} isChecked={hasAcceptedTerms}>
              <Text fontSize="xs">I agree to the terms and conditions.</Text>
            </Checkbox>
          </Box>
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default SubmissionRs;
