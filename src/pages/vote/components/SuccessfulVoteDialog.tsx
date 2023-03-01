import { useParams } from 'react-router-dom';

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex } from '@chakra-ui/react';
import { IconCircleCheck } from '@tabler/icons';

import { URL, TARGET, SIZE, VOTED_TWEET, VOTE_PAGE_LINK } from '@modules/modals/screens/twitter/models/constants';

export const SuccessfulVoteDialog = ({ isOpen, onOpen, onClose, cancelRef }: { isOpen: any; onOpen: any; onClose: any; cancelRef: any }) => {
  const { space, tape, id } = useParams();

  const windowParams = [`${URL}${VOTED_TWEET}${id} ${VOTE_PAGE_LINK}${space}${tape}${id}`, TARGET, SIZE];

  return (
    <>
      <AlertDialog isCentered isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Flex gap={2} alignItems={'center'}>
                <IconCircleCheck style={{ marginRight: '2px' }} height="18" width="18" /> Vote Sucessfully Cast
              </Flex>
            </AlertDialogHeader>
            <AlertDialogBody>You may update anytime before the cycle ends.</AlertDialogBody>
            <AlertDialogFooter>
              <Flex gap={1}>
                <Button variant={'outline'} size="sm" ref={cancelRef} onClick={onClose}>
                  Back
                </Button>
                <Button
                  size="sm"
                  colorScheme="twitter"
                  onClick={() => {
                    window.open(windowParams[0], windowParams[1], windowParams[2]);
                  }}
                >
                  Tweet
                </Button>
              </Flex>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
