import { store } from '@/store';
import { Flex, Stack, Image, Text, SimpleGrid, GridItem, Box, Divider } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const Spotlight = () => {
  const spotlight = useSelector(store.select.userModel.selectSpotlight);
  return (
    <SimpleGrid px={5} py={{ base: 5, xl: 5 }} columns={{ base: 6, xl: 5 }} gap={{ base: 4, xl: 8 }}>
      <GridItem as={Stack} justifyContent="center" colSpan={{ base: 2, xl: 1 }}>
        <Image alt="spotlight cover" border="solid 1px" borderColor="heds.100" shadow={'md'} rounded="lg" objectFit={'cover'} src={spotlight?.cover} />
      </GridItem>
      <GridItem colSpan={{ base: 4, xl: 3 }}>
        <Stack ml={{ base: 3, md: 10, lg: 5, xl: 0 }} h="full" justifyContent={'center'}>
          <Text mt={'0 !important'} fontSize={{ base: '2xs', xl: 'xs' }} fontFamily="karla" fontWeight={'bold'} opacity="40%" color="white">
            TRACK
          </Text>
          <Text data-testid="spotlight-track-name" letterSpacing={'wide'} fontFamily={'inter'} mt={'-1 !important'} color="white" fontSize={{ base: 'sm', md: 'md', xl: 'md' }}>
            {spotlight?.submission_data?.sub_id}
          </Text>
          <Divider opacity={'30%'} maxW={{ base: '24', xl: '52' }} w="full" borderColor="heds.100" />
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Stack>
              <Text fontSize={{ base: '2xs', xl: 'xs' }} fontFamily="karla" fontWeight={'bold'} opacity="40%" color="white">
                ARTIST
              </Text>
              <Text
                data-testid="spotlight-artist-name"
                opacity={'80%'}
                letterSpacing={'wide'}
                fontFamily={'inter'}
                mt={'-1 !important'}
                color="white"
                fontSize={{ base: 'sm', md: 'md', xl: 'md' }}
              >
                {spotlight?.artists.map((e: any) => e.display_name)}
              </Text>
            </Stack>
            <Flex display={{ base: 'flex', xl: 'none' }} gap={2.5} justifyContent={'end'}>
              <Box as={'i'} className="fa-solid fa-play-circle" color="heds.200" fontSize="2xl" />
              <Box as={'i'} className="fa-solid fa-heart" color="heds.100" opacity={'40%'} fontSize="2xl" />
            </Flex>
          </Flex>
        </Stack>
      </GridItem>
      <GridItem display={{ base: 'none', xl: 'flex' }} h="full" colSpan={1}>
        <Flex h="full" alignItems={'center'}>
          <Box as={'i'} className="fa-solid fa-play-circle" color="heds.200" fontSize="4xl" />
          <Box as={'i'} className="fa-solid fa-heart" color="heds.100" opacity={'40%'} fontSize="4xl" ml={5} />
        </Flex>
      </GridItem>
    </SimpleGrid>
  );
};
