import { US } from 'country-flag-icons/react/3x2';
import { Container, Stack, Flex, Button, Icon, Box, Text, Image, Skeleton, useBoolean, Badge } from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons';
import {
  LATEST_TAPE_HEADING,
  LATEST_TAPE_TITLE,
  LATEST_TAPE_DESC,
  LATEST_TAPE_ARTIST,
  LATEST_TAPE_LINK,
  LATEST_TAPE_PROMO_IMG,
} from '@/pages/explore/store/constants';
import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Link } from 'react-router-dom';
import * as gaEvents from '@/events';

const LatestRelease = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const artistsMapping = useSelector(store.select.artistModel.selectArtistMapping);
  return (
    <Box data-testid="explore-hedsolo" w="full">
      <Container px={{ base: 8, lg: 40 }} py={{ base: 10, lg: 24 }} maxW="8xl">
        <Stack alignItems={'start'}>
          <Badge colorScheme={'green'} py={1} px={2} variant={'outline'} fontSize={{ base: 'sm', lg: 'md' }}>
            {LATEST_TAPE_HEADING}
          </Badge>
          <Text
            fontFamily={"'Space Mono', monospace"}
            color={'blackAlpha.800'}
            letterSpacing={'wide'}
            fontSize={{ base: '4xl', lg: '7xl' }}
            fontWeight={'normal'}
          >
            {LATEST_TAPE_TITLE}
          </Text>
          <Text maxW="70ch" mt={10} color={'gray.500'} fontFamily={'"Space Mono", monospace'}>
            {LATEST_TAPE_DESC}
          </Text>
        </Stack>
        <Flex pt={{ base: 20, lg: 20 }} gap={8} w="full" direction={{ base: 'column', sm: 'row' }}>
          <Box>
            <Skeleton rounded="3xl" minW={'20rem'} h="13rem" isLoaded={hasImageLoaded}>
              <Flex mb={'-12'} mx={{ base: 4, lg: 5 }} position={'relative'} justifyContent={'space-between'}>
                <Button
                  onClick={() => gaEvents.clickLatestReleaseFeatureLink()}
                  as={Link}
                  to={`/u/${LATEST_TAPE_ARTIST}`}
                  data-testid="hedsolo-artist-button"
                  justifySelf={'start'}
                  py="4"
                  border="1px"
                  borderColor="black"
                  size="sm"
                  px="12"
                  rounded="full"
                  bg="white"
                >
                  <Text color="gray.500" fontWeight={'light'} fontFamily={'"Space Mono", monospace'}>
                    / {artistsMapping?.[LATEST_TAPE_ARTIST]?.displayName.toUpperCase()}
                  </Text>
                </Button>
                <Button as={Link} to={LATEST_TAPE_LINK} py="4" border="1px" borderColor="black" size="sm" rounded="full" bg="white" zIndex={'30'}>
                  <Icon color="gray.500" h="4" w="4" as={IconArrowRight}></Icon>
                </Button>
              </Flex>
              <Image
                onLoad={setHasImageLoaded.on}
                border="1px"
                inset={'1'}
                rounded="3xl"
                minW={{ base: 'full', xl: '30rem' }}
                minH="13rem"
                h="13rem"
                objectFit={'cover'}
                src={LATEST_TAPE_PROMO_IMG}
              />
               <Box right="5" bottom="12" textAlign={'end'} position={'relative'}>
                <Icon shadow="md" border="4px" rounded="xl" borderColor="white" h="8" w="11" as={US} />
              </Box>
            </Skeleton>
          </Box>
          <Button
            as={Link}
            to={LATEST_TAPE_LINK}
            mx={{ base: 'auto', lg: '0' }}
            display={{ base: 'flex', sm: 'none' }}
            my={{ base: 2, lg: 0 }}
            border="1px"
            borderColor="black"
            size="sm"
            rounded="full"
            bg="white"
            zIndex={'30'}
          >
            <Icon color="gray.500" h="4" w="4" as={IconArrowRight}></Icon>
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default LatestRelease;
