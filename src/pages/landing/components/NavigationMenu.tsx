import { VStack, Box, IconButton, Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';

export const NavigationMenu = ({ isOpen, onClose, initDrawerRef }: any) => {
  return (
    <Drawer initialFocusRef={initDrawerRef} isOpen={isOpen} onClose={onClose} placement="top" size="full">
      <DrawerContent ref={initDrawerRef} backgroundColor="#000000" color="#FFFFFF" fontFamily={'"Space Mono", monospace'}>
        <DrawerHeader display="flex" justifyContent="center">
          <IconButton aria-label="Close menu" colorScheme="white" icon={<CloseIcon />} border="none" variant="link" onClick={() => onClose()} />
        </DrawerHeader>
        <DrawerBody>
          <VStack spacing={4} fontSize={['3xl', 'null', '5xl']}>
            <Box>
              <Link to="/explore">Explore</Link>
            </Box>
            <Box>
              <Link to="/tapes">Tapes</Link>
            </Box>
            <Box>
              <Link to="/artists">Artists</Link>
            </Box>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
