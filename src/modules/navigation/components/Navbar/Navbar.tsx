import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import { Switch } from '@/common/forms';
import { Dispatch, store } from '@/store';
import { Avatar, Badge, Box, Button, Container, Divider, Flex, IconButton, ListItem, ScaleFade, Text, UnorderedList } from '@chakra-ui/react';
import { Bars3Icon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { NavLink } from '@modules/navigation/store/navigationModel';
import { Modals } from '@/modules/modals/store/modalModel';
import { useEffect } from 'react';

const Navbar = (): JSX.Element => {
  const { isConnected, address } = useAccount();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const isOpen: boolean = useSelector(store.select.navigationModel.selectIsOpen);
  const brandText: string = useSelector(store.select.navigationModel.selectBrandText);
  const navLinks: NavLink[] = useSelector(store.select.navigationModel.selectAllNavLinks);
  const profilePicture: string = useSelector(store.select.userModel.selectConnectedUserProfilePicture);
  const nextModal = useSelector(store.select.modalModel.selectNextModal);

  useEffect(() => {
    if (isConnected) {
      dispatch.userModel.getConnectedUserData(address.toLowerCase());
      if (nextModal) dispatch.modalModel.setModal(nextModal);
      else dispatch.modalModel.setModalOpen(false);
    }
  }, [isConnected]);

  return (
    <Container minW="100vw">
      <Box position={'relative'} zIndex={'20'}>
        <Flex py={'6'} px={{ base: 2, lg: 10 }} mx="auto" justify={'space-between'} alignItems={'end'} display={{ base: 'none', lg: 'flex' }}>
          <Flex display={{ base: 'none', lg: 'flex' }} alignItems={'center'}>
            <Flex alignItems={'end'} gap={4} mr={1}>
              <Link to="/">
                <Text
                  fontFamily={"'Space Mono', monospace"}
                  color={'gray.900'}
                  fontSize={{ base: '2xl', lg: '4xl' }}
                  fontWeight={'medium'}
                  letterSpacing="wide"
                  position={'relative'}
                  bottom={{ lg: '3.5px' }}
                >
                  {brandText}
                </Text>
              </Link>
            </Flex>
            <UnorderedList display={{ base: 'none', md: 'inline' }} position={'sticky'} textAlign={'left'} px={4}>
              <Box display={'inline-flex'} alignItems={'center'} justifyContent={'start'} className={`navbar-parent`}>
                {navLinks.map((navItem) => {
                  return (
                    <Box key={navItem.path + navItem.name}>
                      {pathname === navItem.path ? (
                        <ListItem textDecor={'underline'} textUnderlineOffset={'4.5px'} className="current" data-hover={navItem.name}>
                          <Link to={navItem.path}>{navItem.name}</Link>
                        </ListItem>
                      ) : (
                        <ListItem className="hover-underline-animation" data-hover={navItem.name}>
                          <Link to={navItem.path}>{navItem.name}</Link>
                        </ListItem>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </UnorderedList>
          </Flex>
          <Box alignSelf={'center'} alignItems={'center'} gap={5} display={{ base: 'none', lg: 'flex' }}>
            <Switch />
            {isConnected ? (
              <Flex mr={{ base: -2, lg: 0 }} pl={{ base: 1, lg: 0 }} alignSelf={{ lg: 'end' }} alignItems={{ lg: 'end' }}>
                <Avatar
                  className="hover:scale-105 ease-in-out transition-all cursor-pointer"
                  onClick={() => navigate(`/u/${address}`)}
                  size={'md'}
                  src={profilePicture}
                />
                <Badge
                  onClick={() => {
                    dispatch.modalModel.setModal(Modals.USER_MODAL);
                    dispatch.modalModel.setModalOpen(true);
                  }}
                  border="1px"
                  borderColor="black"
                  minW="fit-content"
                  borderRadius="full"
                  bg="white"
                  boxSize="2em"
                  alignSelf={'end'}
                  className="-ml-[20%] aspect-square"
                  as={IconButton}
                  icon={<EllipsisHorizontalIcon height="14" width="14" />}
                />
              </Flex>
            ) : (
              <ConnectKitButton.Custom>
                {({ isConnected, isConnecting, show, hide, address, ensName }) => {
                  return (
                    <Button
                      onClick={show}
                      isLoading={isConnecting}
                      rounded="full"
                      px={{ base: 4, lg: 5 }}
                      size="sm"
                      color="white"
                      bg={isConnected ? 'unset' : 'black'}
                      className={isConnected && 'gradient'}
                    >
                      connect
                    </Button>
                  );
                }}
              </ConnectKitButton.Custom>
            )}
          </Box>
        </Flex>
        <Flex py={5} px={2} display={{ base: 'flex', lg: 'none' }} alignItems={'center'} justify={'space-between'}>
          <Flex gap={3} alignItems={'center'}>
            <Button
              px={2}
              bg="transparent"
              aria-label="Open Menu"
              onClick={() => dispatch.navigationModel.setIsOpen(!isOpen)}
              display={{ base: 'flex', lg: 'none' }}
              _focus={{ bg: 'transparent' }}
              transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
            >
              <Bars3Icon className={isOpen ? 'block h-6 w-6' : 'block h-6 w-6'} aria-hidden="true" />
            </Button>
            <Flex alignItems={'end'} gap={4} mr={1}>
              <Link to="/">
                <Text
                  color={'gray.900'}
                  fontFamily={"'Space Mono', monospace"}
                  fontSize={{ base: 'xl', lg: '4xl' }}
                  fontWeight={'medium'}
                  letterSpacing="wide"
                  className="relative bottom-[0.5px] lg:bottom-[3.5px]"
                >
                  {brandText}
                </Text>
              </Link>
            </Flex>
          </Flex>
          <Flex gap={4} alignItems={'center'} alignSelf={'center'}>
            <Switch />
            {isConnected ? (
              <Flex mr={{ base: -2, lg: 0 }} pl={{ base: 1, lg: 0 }} alignSelf={{ lg: 'end' }} alignItems={{ lg: 'end' }}>
                <Avatar
                  className="hover:scale-105 ease-in-out transition-all cursor-pointer"
                  onClick={() => navigate(`/u/${address}`)}
                  size={'md'}
                  src={profilePicture}
                />
                <Badge
                  onClick={() => {
                    dispatch.modalModel.setModal(Modals.USER_MODAL);
                    dispatch.modalModel.setModalOpen(true);
                  }}
                  border="1px"
                  borderColor="black"
                  minW="fit-content"
                  borderRadius="full"
                  bg="white"
                  boxSize="2em"
                  alignSelf={'end'}
                  className="-ml-[20%] aspect-square"
                  as={IconButton}
                  icon={<EllipsisHorizontalIcon height="14" width="14" />}
                />
              </Flex>
            ) : (
              <ConnectKitButton.Custom>
                {({ isConnected, isConnecting, show, hide, address, ensName }) => {
                  return (
                    <Button
                      onClick={show}
                      isLoading={isConnecting}
                      rounded="full"
                      px={{ base: 4, lg: 5 }}
                      size="sm"
                      color="white"
                      bg={isConnected ? 'unset' : 'black'}
                      className={isConnected && 'gradient'}
                    >
                      connect
                    </Button>
                  );
                }}
              </ConnectKitButton.Custom>
            )}
          </Flex>
        </Flex>
      </Box>
      <ScaleFade initialScale={0.0} in={isOpen}>
        <Flex h={isOpen ? 'full' : '0'} display={{ base: 'flex', md: 'none' }} direction="row" alignItems={'baseline'} pb={isOpen ? 3 : 0} mx={2}>
          {navLinks.map((navItem) => (
            <Button
              bg="transparent"
              size="xs"
              fontWeight={pathname === navItem.path ? 'medium' : 'light'}
              textColor={pathname === navItem.path ? 'black' : 'gray.500'}
              isDisabled={pathname === navItem.path}
              _disabled={{ textColor: 'black' }}
              key={navItem.name + navItem.path}
              onClick={() => {
                dispatch.navigationModel.setIsOpen(!isOpen);
                setTimeout(() => navigate(navItem.path), 150);
              }}
            >
              {navItem.name}
            </Button>
          ))}
        </Flex>
      </ScaleFade>
      <Divider borderColor={'gray.300'} display={isOpen ? { base: 'block', md: 'none' } : 'none'} />
    </Container>
  );
};

export default Navbar;
