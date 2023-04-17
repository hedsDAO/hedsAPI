import { Dispatch } from '@/store';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modals } from '../../modals/models/modalModel';

export const Navbar = () => {
  const dispatch = useDispatch<Dispatch>();
  const navLinks = {
    explore: {
      text: 'EXPLORE',
      link: '/explore',
    },
    tapes: {
      text: 'TAPES',
      link: '/tapes',
    },
    about: {
      text: 'ABOUT',
      link: '/about',
    },
  };

  return (
    <Flex px={10} py={4} alignItems="center" justifyContent={'space-between'}>
      <Flex alignItems={'center'} gap={12}>
        <Text fontFamily={'karla'} fontWeight={'light'} fontSize={'4xl'} color="white">
          heds
        </Text>
        <Flex mt={3} gap={5}>
          {Object.values(navLinks).map((link) => (
            <Text key={link.link} to={link.link} as={Link} letterSpacing={'widest'} fontSize="xs" fontFamily={'inter'} color="white" fontWeight={'light'}>
              {link.text}
            </Text>
          ))}
        </Flex>
      </Flex>
      <Box mt={2}>
        <Button size="xs" onClick={() => dispatch.modalModel.setModal(Modals.CONNECT)} variant={'connect'}>
          Connect
        </Button>
      </Box>
    </Flex>
  );
};
