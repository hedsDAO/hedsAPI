import { useDisclosure, Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton } from '@chakra-ui/react';

export const NavigationMenu = ({ isOpen, onClose }: any) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="top" size="full">
      <DrawerContent backgroundColor="#000000" color="#FFFFFF">
        <DrawerCloseButton />
        <DrawerHeader>heds</DrawerHeader>
        <DrawerBody>nav</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
