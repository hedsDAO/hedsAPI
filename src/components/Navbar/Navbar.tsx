import { useAccount } from 'wagmi';
import { Flex } from '@chakra-ui/react';
import { BrandLogo } from '@components/Navbar/components/BrandLogo/BrandLogo';
import { ConnectButton } from '@components/Navbar/components/ConnectButton/ConnectButton';
import { DisconnectButton } from '@components/Navbar/components/DisconnectButton/DisconnectButton';
import { NavbarContainer } from '@components/Navbar/components/NavbarContainer/NavbarContainer';
import { NavLinks } from '@components/Navbar/components/NavLinks/NavLinks';
import { UserAvatar } from '@components/Navbar/components/UserAvatar/UserAvatar';
import { navLinks } from '@/components/Navbar/models/constants';
import * as styles from '@/components/Navbar/styles';
import { MobileDropdown } from './components/MobileDropdown/MobileDropdown';

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
      <Flex {...styles.$navbarContainerStyles}>
        <Flex {...styles.$brandLogoAndLinksContainerStyles}>
          <MobileDropdown />
          <BrandLogo />
          <Flex {...styles.$linksContainerStyles}>
            {Object.values(navLinks).map((link) => (
              <NavLinks key={link.text} {...link} />
            ))}
          </Flex>
        </Flex>
        <Flex>
          {isConnected && !isDisconnected ? <UserAvatar /> : <ConnectButton />}
          {isConnected && !isDisconnected ? <DisconnectButton /> : <></>}
        </Flex>
      </Flex>
    </NavbarContainer>
  );
};
