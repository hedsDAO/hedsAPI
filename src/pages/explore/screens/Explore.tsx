import { Box, Flex, Text, Stack, Button } from '@chakra-ui/react';
import { Stats } from '../components/Stats/Stats';
import { items } from '../models/constants';
import { Coverflow } from '../components/Coverflow/Coverflow';
import { useSelector } from 'react-redux';
import { store } from '@/store';

export const Explore = () => {
  const dispatch = store.dispatch.exploreModel;
  const activeIndex = useSelector(store.select.exploreModel.selectActiveIndex);

  return (
    <Box pt={10}>
      <Stack pb={2} alignItems={'center'} justifyContent={'center'} w="full">
        <Text color="white" fontSize={{ base: 'xl', lg: '4xl' }} fontFamily={'poppins'} fontWeight="normal">
          EXPLORE
        </Text>
        <Text letterSpacing={'wide'} fontWeight={'thin'} color="white" opacity={'75%'} fontSize={{ base: '2xs', lg: 'md' }}>
          DISCOVER NEW ARTISTS AND TAPES
        </Text>
      </Stack>
      <Coverflow />
      <Flex gap={2} justifyContent={'center'} w="full">
        {items?.map((image: string, i: number) => {
          return (
            <Button
              key={image + 'pointer'}
              opacity={activeIndex === i ? 0.75 : 0.5}
              fontSize={'xs'}
              color={activeIndex === i ? 'white' : 'heds.bg2'}
              p={'0 !important'}
              minW={'unset'}
              h={'unset'}
              bg="transparent"
              _hover={{ bg: 'transparent', opacity: 1, color: activeIndex === i ? 'white' : 'heds.bg5' }}
              onClick={() => dispatch.setActiveIndex(i)}
            >
              <i className="fa-solid fa-circle"></i>
            </Button>
          );
        })}
      </Flex>
      <Flex mt={{ base: 10, lg: 20 }} justifyContent={'center'} gap={4} w="full">
        <Stats />
      </Flex>
      <Stack
        p={{ base: 5, lg: 20 }}
        justifyContent={'center'}
        alignItems={{ base: 'center', lg: 'start' }}
        textAlign={{ base: 'center', lg: 'start' }}
        mt={{ base: 10, lg: 20 }}
      >
        <Text color="white" fontSize={{ base: 'lg', lg: '2xl' }} fontFamily={'poppins'} fontWeight="normal">
          MOST FEATURED ARTISTS
        </Text>
        <Text letterSpacing={'wide'} fontWeight={'thin'} color="white" opacity={'75%'} fontSize={{ base: '2xs', lg: 'md' }}>
          These artists have been voted on to multiple hedsTAPES via our curation community.
        </Text>
      </Stack>
    </Box>
  );
};
