import { HamburgerIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Button, MenuList, MenuItem, Box } from '@chakra-ui/react';
import { navLinks } from '@/components/Navbar/models/constants';
import { useLocation, useNavigate } from 'react-router-dom';

export const MobileDropdown = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Box display={{ base: 'initial', lg: 'none' }}>
      <Menu>
        <MenuButton as={Button} bg="transparent" _hover={{ bg: 'transparent' }}>
          <HamburgerIcon color="heds.100" boxSize={5} />
        </MenuButton>
        <MenuList ml={2} rounded="sm" borderColor="heds.200" py={0}>
          {Object.values(navLinks).map((link, index) => (
            <MenuItem
              fontFamily={'karla'}
              color={pathname === link.link ? 'black' : 'heds.200'}
              bg={pathname === link.link ? 'heds.100' : 'heds.bg3'}
              letterSpacing={'0.25rem'}
              textTransform="uppercase"
              fontSize="xs"
              key={link.link + 'mobile'}
              borderColor={'black'}
              fontWeight={pathname === link.link ? 'semibold' : 'normal'}
              onClick={() => navigate(link.link)}
            >
              {link.text}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
