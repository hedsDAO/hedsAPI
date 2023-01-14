import { IN } from 'country-flag-icons/react/3x2';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BOX_ONE_DATE, BOX_ONE_DESC, BOX_ONE_TITLE, BOX_TWO_DESC, NEWEST_TAPE_ARTIST, NEWEST_TAPE_HEADING } from '@/pages/explore/store/constants';
import { store } from '@/store';
import { Box, Button, Container, Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons';

const NewestTape = () => {
  const artistsMapping = useSelector(store.select.artistModel.selectArtistMapping);
  const navigate = useNavigate();
  return (
    <Box w="full">
      <Container px={{ base: 10, lg: 40 }} py={{ base: 10, lg: 24 }} maxW="8xl">
        <Stack alignItems={'center'}>
          <Text fontFamily={'"Space Mono", monospace'} color={'gray.500'} letterSpacing={'tight'} fontSize={{ base: 'xl', lg: '5xl' }} fontWeight={'normal'}>
            {NEWEST_TAPE_HEADING}
          </Text>
          <Flex justifyContent={'space-evenly'} pt={14} gap={8} w="full" direction={{ base: 'column', sm: 'row' }}>
            <Box>
              <Flex mb={'-12'} mx={5} position={'relative'} justifyContent={'space-between'}>
                <Button
                  onClick={() => navigate(`/u/${NEWEST_TAPE_ARTIST}`)}
                  justifySelf={'start'}
                  py="4"
                  border="1px"
                  borderColor="black"
                  size={{ base: 'xs', lg: 'sm' }}
                  px="12"
                  rounded="full"
                  bg="white"
                >
                  <Text color="gray.500" fontWeight={'light'} fontFamily={'"Space Mono", monospace'}>
                    / {artistsMapping?.[NEWEST_TAPE_ARTIST]?.displayName.toUpperCase()}
                  </Text>
                </Button>
                <Button
                  onClick={() => navigate(`/u/${NEWEST_TAPE_ARTIST}`)}
                  py="4"
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
              <Image
                border="1px"
                borderColor={'black'}
                inset={'1'}
                rounded="3xl"
                minW={{ base: 'full', xl: '30rem' }}
                minH="11rem"
                h="11rem"
                objectFit={'cover'}
                src={artistsMapping?.[NEWEST_TAPE_ARTIST]?.profilePicture}
              />
              <Box right="5" bottom="12" textAlign={'end'} position={'relative'}>
                <Icon shadow="md" border="4px" rounded="xl" borderColor="white" h="8" w="11" as={IN} />
              </Box>
            </Box>
          </Flex>
          <Flex alignItems={'center'} pt={{ base: 5, lg: 10 }} gap={10} direction={{ base: 'column', lg: 'row' }} maxW="4xl" mx="auto">
            <Stack alignItems={'start'}>
              <Text color="gray.700" fontWeight={'light'} fontFamily={'"Space Mono", monospace'}>
                {BOX_ONE_TITLE}
              </Text>
              <Text color="gray.500" fontWeight={'light'} fontSize="xs" fontFamily={'"Space Mono", monospace'}>
                {BOX_ONE_DESC} <br />
                {BOX_ONE_DATE}
              </Text>
            </Stack>
            <Flex direction={{ base: 'column', lg: 'row' }} gap={6} alignItems={'center'}>
              <Text
                textAlign={{ base: 'center', lg: 'start' }}
                maxW={'55ch'}
                color="gray.500"
                fontSize={{ base: '2xs', lg: 'xs' }}
                fontWeight={'light'}
                fontFamily={'"Space Mono", monospace'}
              >
                {BOX_TWO_DESC}
              </Text>
              <Button my={{ base: 5, lg: 0 }} border="1px" borderColor="black" size="sm" rounded="full" bg="white" zIndex={'30'}>
                <Icon color="gray.500" h="4" w="4" as={IconArrowRight}></Icon>
              </Button>
            </Flex>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default NewestTape;
