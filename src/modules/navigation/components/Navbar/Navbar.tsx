import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { Switch } from '@/common/forms';
import { Dispatch, store } from '@/store';
import { Avatar, Badge, Box, Button, Container, Flex, IconButton, ListItem, ScaleFade, Text, UnorderedList } from '@chakra-ui/react';
import { Bars3Icon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { NavLink } from '@modules/navigation/store/navigationModel';
import { Modals } from '@/modules/modals/store/modalModel';

const Navbar = (): JSX.Element => {
  const { isConnected, address } = useAccount();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const isOpen: boolean = useSelector(store.select.navigationModel.selectIsOpen);
  const brandText: string = useSelector(store.select.navigationModel.selectBrandText);
  const navLinks: NavLink[] = useSelector(store.select.navigationModel.selectAllNavLinks);
  const profilePicture: string = useSelector(store.select.userModel.selectConnectedUserProfilePicture);
  const isShowingPlayer = useSelector(store.select.audioModel.selectIsShowingPlayer);

  return (
    <Container minW="100vw">
      <Box position={'relative'} zIndex={'20'}>
        <Flex py={'6'} px={{ base: 2, lg: 10 }} mx="auto" justify={'space-between'} alignItems={'end'} display={{ base: 'none', lg: 'flex' }}>
          <Flex display={{ base: 'none', lg: 'flex' }} alignItems={'center'}>
            <Flex alignItems={'end'} gap={4} mr={1}>
              <Link to="/">
                <Text
                  color={'gray.900'}
                  fontSize={{ base: '2xl', lg: '4xl' }}
                  fontWeight={'medium'}
                  letterSpacing="wide"
                  position={'relative'}
                  bottom={{ lg: '3px' }}
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
            {isConnected && <Switch />}
            {/* TODO: add user / wallet state logic and functionality  */}
            {isConnected ? (
              <Flex mr={{ base: -2, lg: 0 }} pl={{ base: 1, lg: 0 }} alignSelf={{ lg: 'end' }} alignItems={{ lg: 'end' }}>
                <Avatar
                  className="hover:scale-105 ease-in-out transition-all cursor-pointer"
                  onClick={() => navigate(`/u/${address}`)}
                  size={'md'}
                  src={profilePicture}
                ></Avatar>
                <Badge
                  onClick={() => {
                    dispatch.modalModel.setModal(Modals.USER_MODAL);
                    dispatch.modalModel.setModalOpen(true);
                  }}
                  border="2px"
                  borderColor="white"
                  minW="fit-content"
                  borderRadius="full"
                  boxSize="2.25em"
                  alignSelf={'end'}
                  className="-ml-[20%] aspect-square"
                  as={IconButton}
                  icon={<EllipsisHorizontalIcon className="text-neutral-700 " height="15" width="15" />}
                />
              </Flex>
            ) : (
              <Button
                onClick={() => {
                  dispatch.modalModel.setModal(Modals.CONNECT_MODAL);
                  dispatch.modalModel.setModalOpen(true);
                }}
                rounded="full"
                px={{ base: 4, lg: 5 }}
                size="sm"
                color="white"
                bg={isConnected ? 'unset' : 'black'}
                className={isConnected && 'gradient'}
              >
                connect
              </Button>
            )}
          </Box>
        </Flex>
        <Flex py={5} px={2} display={{ base: 'flex', lg: 'none' }} alignItems={'center'} justify={'space-between'}>
          <Flex gap={2} alignItems={'center'}>
            <Button
              px={2}
              bg="transparent"
              aria-label="Open Menu"
              onClick={() => dispatch.navigationModel.setIsOpen(!isOpen)}
              display={{ base: 'flex', lg: 'none' }}
            >
              <Bars3Icon className={isOpen ? 'block h-6 w-6' : 'block h-6 w-6'} aria-hidden="true" />
            </Button>
            <Flex alignItems={'end'} gap={4} mr={1}>
              <Link to="/">
                <Text color={'gray.900'} fontSize={{ base: 'xl', lg: '4xl' }} fontWeight={'medium'} letterSpacing="wide" className="relative lg:bottom-[3px]">
                  {brandText}
                </Text>
              </Link>
            </Flex>
          </Flex>
          <Flex gap={4} alignItems={'center'} alignSelf={'center'}>
            {isConnected && <Switch />}
            {/* TODO: add user / wallet state logic and functionality  */}
            {isConnected ? (
              <Flex mr={{ base: -2, lg: 0 }} pl={{ base: 1, lg: 0 }} alignSelf={{ lg: 'end' }} alignItems={{ lg: 'end' }}>
                <Avatar
                  className="hover:scale-105 ease-in-out transition-all cursor-pointer"
                  onClick={() => navigate(`/u/${address}`)}
                  size={'md'}
                  src={profilePicture}
                ></Avatar>
                <Badge
                  onClick={() => {
                    dispatch.modalModel.setModal(Modals.USER_MODAL);
                    dispatch.modalModel.setModalOpen(true);
                  }}
                  border="2px"
                  borderColor="white"
                  minW="fit-content"
                  borderRadius="full"
                  boxSize="2.25em"
                  alignSelf={'end'}
                  className="-ml-[20%] aspect-square"
                  as={IconButton}
                  icon={<EllipsisHorizontalIcon className="text-neutral-700 " height="15" width="15" />}
                />
              </Flex>
            ) : (
              <Button
                onClick={() => {
                  dispatch.modalModel.setModal(Modals.CONNECT_MODAL);
                  dispatch.modalModel.setModalOpen(true);
                }}
                rounded="full"
                px={{ base: 4, lg: 5 }}
                size="sm"
                fontSize={{ base: 'xs', lg: 'sm' }}
                fontWeight={{ base: 'normal', lg: 'medium' }}
                letterSpacing={'wide'}
                color="white"
                bg={isConnected ? 'unset' : 'black'}
                className={isConnected && 'gradient'}
              >
                connect
              </Button>
            )}
          </Flex>
        </Flex>
      </Box>
      <ScaleFade initialScale={0.0} in={isOpen}>
        <Flex h={isOpen ? 'full' : '0'} display={'flex'} direction="column" experimental_spaceY={'1'} py={isOpen ? 3 : 0} mx={2}>
          {navLinks.map((navItem) => (
            <Button
              bg="transparent"
              size="sm"
              border="1px"
              className={`navbar-mobile-link`}
              key={navItem.name + navItem.path}
              as={Button}
              to={navItem.path}
              onClick={() => {
                navigate(navItem.path);
                dispatch.navigationModel.setIsOpen(!isOpen);
              }}
            >
              {navItem.name}
            </Button>
          ))}
        </Flex>
      </ScaleFade>
    </Container>
  );
};

export default Navbar;

// import { Modals } from '@/modules/modals/store/modalModel';
// import { Dispatch, store } from '@/store';
// import { Avatar, Badge, Flex, IconButton, Spinner } from '@chakra-ui/react';
// import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useAccount } from 'wagmi';

// const ConnectButton = ({ nextModal }: { nextModal?: Modals }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<Dispatch>();
//   const { isConnected, address, isReconnecting, isConnecting } = useAccount();
//   const profilePicture = useSelector(store.select.userModel.selectConnectedUserProfilePicture);
//   return (
//     <Flex gap={2}>
//       {isConnected && profilePicture ? (
//         <Flex mr={{ base: -2, lg: 0 }} pl={{ base: 1, lg: 0 }} alignSelf={{ lg: 'end' }} alignItems={{ lg: 'end' }}>
//           <Avatar
//             className="hover:scale-105 ease-in-out transition-all cursor-pointer"
//             onClick={() => navigate(`/u/${address}`)}
//             size={'md'}
//             src={profilePicture}
//           ></Avatar>
//           <Badge
//             onClick={() => {
//               dispatch.modalModel.setModal(Modals.USER_MODAL);
//               dispatch.modalModel.setModalOpen(true);
//             }}
//             border="2px"
//             borderColor="white"
//             minW="fit-content"
//             borderRadius="full"
//             boxSize="2.25em"
//             alignSelf={'end'}
//             className="-ml-[20%] aspect-square"
//             as={IconButton}
//             icon={<EllipsisHorizontalIcon className="text-neutral-700 " height="15" width="15" />}
//           />
//         </Flex>
//       ) : (
//         <button
//           onClick={() => {
//             if (isConnected) navigate(`/u/${address}`);
//             else {
//               if (nextModal) dispatch.modalModel.setNextModal(nextModal);
//               dispatch.modalModel.setModal(Modals.CONNECT_MODAL);
//               dispatch.modalModel.setModalOpen(true);
//             }
//           }}
//           className={`mr-2 px-5 lg:px-6 text-white inline-flex items-center rounded-full tracking-widest text-xs lg:text-sm py-1 ${
//             isConnected ? 'bg-black' : 'gradient'
//           } hover:bg-neutral-900 ease-linear`}
//         >
//           {isConnecting || isReconnecting ? (
//             <>
//               <Spinner mx={5} size={'sm'} />
//             </>
//           ) : (
//             'connect'
//           )}
//         </button>
//       )}
//     </Flex>
//   );
// };

// export default ConnectButton;
