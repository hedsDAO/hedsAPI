import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  CheckboxIcon,
  Flex,
} from '@chakra-ui/react';
import { IconCircleCheck } from '@tabler/icons';

export const SuccessfulVoteDialog = ({ isOpen, onOpen, onClose, cancelRef }: { isOpen: any; onOpen: any; onClose: any; cancelRef: any }) => {
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
              <Button variant={'outline'} size="sm" ref={cancelRef} onClick={onClose}>
                back
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
