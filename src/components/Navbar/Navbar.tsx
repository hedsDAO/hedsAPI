import { Dispatch, store } from '@/store';
import { Box, Button, Flex, Text, Avatar, AvatarBadge } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Modals } from '../../modals/models/modalModel';

export const Navbar = () => {
  const { pathname } = useLocation();
  const { isConnected } = useAccount();
  const connectedUser = useSelector(store.select.authModel.selectUser);
  const dispatch = useDispatch<Dispatch>();
  const navLinks = {
    explore: {
      text: 'EXPLORE',
      link: '/explore',
      isActive: pathname === '/explore',
    },
    tapes: {
      text: 'TAPES',
      link: '/tapes',
      isActive: pathname === '/tapes',
    },
    about: {
      text: 'ABOUT',
      link: '/about',
      isActive: pathname === '/about',
    },
  };

  return (
    <Flex px={10} py={5} alignItems="center" justifyContent={'space-between'}>
      <Flex alignItems={'center'} gap={10}>
        <Text to={'/'} as={Link} fontFamily={'"Space Mono", monospace'} fontWeight={'light'} fontSize={'4xl'} color="white">
          heds
        </Text>
        <Flex mt={3} gap={5}>
          {Object.values(navLinks).map((link) => (
            <Text
              key={link.link}
              to={link.link}
              as={Link}
              opacity={link.isActive ? '100%' : '70%'}
              letterSpacing={'widest'}
              fontSize="xs"
              fontFamily={'inter'}
              color="white"
              fontWeight={'light'}
            >
              {link.text}
            </Text>
          ))}
        </Flex>
      </Flex>
      <Box mt={2}>
        {isConnected ? (
          <Avatar size="md" variant={'user'} src={connectedUser?.profile_picture}>
            <AvatarBadge size="xs" as={Button} onClick={() => dispatch.modalModel.setModal(Modals.CONNECT)} bg="heds.bg">
              <i style={{ fontSize: '1rem' }} className="fas fa-cog"></i>
            </AvatarBadge>
          </Avatar>
        ) : (
          <Button className="gradient" size="xs" onClick={() => dispatch.modalModel.setModal(Modals.CONNECT)} variant={'connect'}>
            Connect
          </Button>
        )}
      </Box>
    </Flex>
  );
};
