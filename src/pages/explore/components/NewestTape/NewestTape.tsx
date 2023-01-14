import { Container, Stack, Flex, Button, Icon, Box, Image, Text } from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons';
import { IN } from 'country-flag-icons/react/3x2';

const NewestTape = () => {
  return (
    <Box w="full">
      <Container px={{ base: 6, lg: 40 }} py={{ base: 10, lg: 24 }} maxW="8xl">
        <Stack alignItems={'center'}>
          <Text fontFamily={'"Space Mono", monospace'} color={'gray.500'} letterSpacing={'tight'} fontSize={{ base: 'xl', lg: '5xl' }} fontWeight={'normal'}>
            NEWEST TAPE
          </Text>
          <Flex justifyContent={'space-evenly'} pt={14} gap={8} w="full" direction={{ base: 'column', sm: 'row' }}>
            <Box>
              <Flex mb={'-12'} mx={5} position={'relative'} justifyContent={'space-between'}>
                <Button justifySelf={'start'} py="4" border="1px" borderColor="black" size="sm" px="12" rounded="full" bg="white">
                  <Text color="gray.500" fontWeight={'light'} fontFamily={'"Space Mono", monospace'}>
                    / three oscillators
                  </Text>
                </Button>
                <Button py="4" border="1px" borderColor="black" size="sm" rounded="full" bg="white" zIndex={'30'}>
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
                src="/3osc.png"
              />
              <Box right="5" bottom="12" textAlign={'end'} position={'relative'}>
                <Icon shadow="md" border="4px" rounded="xl" borderColor="white" h="8" w="11" as={IN} />
              </Box>
            </Box>
          </Flex>
          <Flex alignItems={'center'} pt={10} gap={10} direction={{ base: 'column', lg: 'row' }} maxW="4xl" mx="auto">
            <Stack alignItems={'start'}>
              <Text color="gray.700" fontWeight={'light'} fontFamily={'"Space Mono", monospace'}>
                heds x secret garden
              </Text>
              <Text color="gray.500" fontWeight={'light'} fontSize="xs" fontFamily={'"Space Mono", monospace'}>
                release type: collabTAPE <br />
                mint date: FEBRUARY 3RD. 2023
              </Text>
            </Stack>
            <Flex direction={{ base: 'column', lg: 'row' }} gap={6} alignItems={'center'}>
              <Text
                textAlign={{ base: 'center', lg: 'start' }}
                maxW={'55ch'}
                color="gray.500"
                fontSize="xs"
                fontWeight={'light'}
                fontFamily={'"Space Mono", monospace'}
              >
                in collaboration with three oscillators & secretgarden.fm, we've invited heds artists to participate in the creation of the first hedsPLAYER, a
                curated stem plauer & NFT collection
              </Text>
              <Button mt={{ base: 5, lg: 0 }} border="1px" borderColor="black" size="sm" rounded="full" bg="white" zIndex={'30'}>
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
