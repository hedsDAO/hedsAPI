import { useAccount } from 'wagmi';
import { Flex, GridItem, SimpleGrid, Stack } from '@chakra-ui/react';
import { BrandLogo } from '@components/Navbar/components/BrandLogo/BrandLogo';
import { ConnectButton } from '@components/Navbar/components/ConnectButton/ConnectButton';
import { DisconnectButton } from '@components/Navbar/components/DisconnectButton/DisconnectButton';
import { NavbarContainer } from '@components/Navbar/components/NavbarContainer/NavbarContainer';
import { NavLinks } from '@components/Navbar/components/NavLinks/NavLinks';
import { UserAvatar } from '@components/Navbar/components/UserAvatar/UserAvatar';
import { navLinks } from '@/components/Navbar/models/constants';
import * as styles from '@/components/Navbar/styles';
import { MobileDropdown } from './components/MobileDropdown/MobileDropdown';
import { Search } from '../Search/Search';

/**
 * @function Navbar
 * @description Navbar component renders the main navigation bar of the application.
 * It includes brand logo, navigation links and connect/disconnect buttons. This component's
 * animations are handled by the `useScrollPosition` hook.
 * @returns {JSX.Element} Rendered Navbar component.
 */

export const Navbar = () => {
  const { isConnected, isDisconnected } = useAccount();
  return (
    <NavbarContainer>
      <SimpleGrid px={{ base: 3, lg: 8 }} columns={{ base: 9, lg: 8 }}>
        <Flex as={GridItem} colSpan={{ base: 3, lg: 3, xl: 2 }} {...styles.$brandLogoAndLinksContainerStyles}>
          <MobileDropdown />
          <BrandLogo />
          <Flex {...styles.$linksContainerStyles}>
            {Object.values(navLinks).map((link) => (
              <NavLinks key={link.text} {...link} />
            ))}
          </Flex>
        </Flex>
        <Stack justifyContent={'center'} as={GridItem} mr={{ base: 9, sm: 6, md: 2, lg: 0 }} colSpan={{ base: 5, lg: 3, xl: 4 }}>
          <Search />
        </Stack>
        <Flex justifyContent={'end'} as={GridItem} colSpan={{ base: 1, lg: 2 }}>
          {isConnected && !isDisconnected ? <UserAvatar /> : <ConnectButton />}
          {isConnected && !isDisconnected ? <DisconnectButton /> : <></>}
        </Flex>
      </SimpleGrid>
    </NavbarContainer>
  );
};
