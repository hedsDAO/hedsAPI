import { useState } from 'react';
import { ConnectButton } from '@/common/buttons';
import { Disclosure } from '@headlessui/react';
import { Box, Flex } from '@chakra-ui/react';
import { Logo, NavItem, NavLinkContainer, MobileNavButton, MobileNavDropdown, MobileNavItem, AudioSwitch } from '../../components';

const navigation = [
  { name: 'Explore', href: '/explore' },
  { name: 'Tapes', href: '/tapes' },
  { name: 'Collabs', href: '/collab' },
  { name: 'Artists', href: '/artists' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Disclosure as={'nav'}>
      <Box bg={'white'} position={'relative'} zIndex={'20'}>
        <Flex py={'16'} px={{ base: 2, lg: 10 }} maxW="6xl" mx="auto" justify={'space-between'} alignItems={'end'} display={{ base: 'none', lg: 'flex' }}>
          <Flex display={{ base: 'none', lg: 'flex' }} alignItems={'baseline'}>
            <Logo text={'heds'} />
            <NavLinkContainer>
              {navigation.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </NavLinkContainer>
          </Flex>
          <Box alignSelf={'center'} alignItems={'center'} gap={5} display={{ base: 'none', lg: 'flex' }}>
            <AudioSwitch />
            <ConnectButton />
          </Box>
        </Flex>
        <Flex py={5} px={4} display={{ base: 'flex', lg: 'none' }} alignItems={'center'} justify={'space-between'}>
          <Flex alignItems={'center'}>
            <MobileNavButton setIsOpen={setIsOpen} isOpen={isOpen} />
            <Logo text={'heds'} />
          </Flex>
          <Flex gap={4} alignItems={'center'} alignSelf={'center'}>
            <AudioSwitch />
            <ConnectButton />
          </Flex>
        </Flex>
      </Box>
      <MobileNavDropdown isOpen={isOpen}>
        {navigation.map((item) => {
          return <MobileNavItem key={item.name} item={item} setIsOpen={setIsOpen} />;
        })}
      </MobileNavDropdown>
    </Disclosure>
  );
};

export default Navbar;
