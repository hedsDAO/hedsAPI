import { Container, Stack, Flex, Button, Icon, Box, Text, Image } from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons';
import { AR } from 'country-flag-icons/react/3x2';
import { HEDS_SOLO_HEADING, HEDS_SOLO_TITLE, HEDS_SOLO_DESC, HEDS_SOLO_ARTIST } from '@/pages/explore/store/constants';
import { useSelector } from 'react-redux';
import { store } from '@/store';
import { useNavigate } from 'react-router-dom';

const HedsSolo = () => {
  const artistsMapping = useSelector(store.select.artistModel.selectArtistMapping);
  const navigate = useNavigate();
  return (
    <Box w="full">
      <Container px={{ base: 10, lg: 40 }} py={{ base: 10, lg: 24 }} maxW="8xl">
        <Stack alignItems={'start'}>
          <Text color={'gray.500'} fontFamily={'"Space Mono", monospace'}>
            {HEDS_SOLO_HEADING}
          </Text>
          <Text color={'blackAlpha.800'} letterSpacing={'wide'} fontSize={{ base: '5xl', lg: '8xl' }} fontWeight={'normal'}>
            {HEDS_SOLO_TITLE}
          </Text>
          <Text maxW="70ch" mt={10} color={'gray.500'} fontFamily={'"Space Mono", monospace'}>
            {HEDS_SOLO_DESC}
          </Text>
        </Stack>
        <Flex pt={{ base: 20, lg: 20 }} gap={8} w="full" direction={{ base: 'column', sm: 'row' }}>
          <Box>
            <Flex mb={'-12'} mx={5} position={'relative'} justifyContent={'space-between'}>
              <Button
                onClick={() => navigate(`/u/${HEDS_SOLO_ARTIST}`)}
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
                  / {artistsMapping?.[HEDS_SOLO_ARTIST]?.displayName.toUpperCase()}
                </Text>
              </Button>
              <Button
                onClick={() => navigate(`/u/${HEDS_SOLO_ARTIST}`)}
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
              h="11rem"
              objectFit={'cover'}
              src={artistsMapping?.[HEDS_SOLO_ARTIST]?.profilePicture}
            />
            <Box right="5" bottom="12" textAlign={'end'} position={'relative'}>
              <Icon shadow="md" border="4px" rounded="xl" borderColor="white" h="8" w="11" as={AR} />
            </Box>
          </Box>
        </Flex>
        <Button
          mx="auto"
          display={{ base: 'flex', sm: 'none' }}
          my={{ base: 5, lg: 0 }}
          border="1px"
          borderColor="black"
          size="sm"
          rounded="full"
          bg="white"
          zIndex={'30'}
        >
          <Icon color="gray.500" h="4" w="4" as={IconArrowRight}></Icon>
        </Button>
      </Container>
    </Box>
  );
};

export default HedsSolo;
