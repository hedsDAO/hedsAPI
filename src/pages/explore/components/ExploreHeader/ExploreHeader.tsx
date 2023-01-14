import { Container, Stack, Flex, Button, Icon, Box, Text, Image } from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons';
import { AR } from 'country-flag-icons/react/3x2';

const ExploreHeader = () => {
  return (
    <Box w="full">
      <Container px={{ base: 6, lg: 40 }} py={{ base: 10, lg: 24 }} maxW="8xl">
        <Stack alignItems={'start'}>
          <Text color={'gray.500'} fontFamily={'"Space Mono", monospace'}>
            introducing
          </Text>
          <Text color={'blackAlpha.800'} letterSpacing={'wide'} fontSize={{ base: '5xl', lg: '8xl' }} fontWeight={'normal'}>
            hedSOLO
          </Text>
          <Text maxW="70ch" mt={10} color={'gray.500'} fontFamily={'"Space Mono", monospace'}>
            a new look into the worldwide heds community, featuring solo releases from artists representing the future of music.
          </Text>
        </Stack>
        <Flex pt={'20'} gap={8} w="full" direction={{ base: 'column', sm: 'row' }}>
          <Box>
            <Flex mb={'-12'} mx={5} position={'relative'} justifyContent={'space-between'}>
              <Button justifySelf={'start'} py="4" border="1px" borderColor="black" size="sm" px="12" rounded="full" bg="white">
                <Text color="gray.500" fontWeight={'light'} fontFamily={'"Space Mono", monospace'}>
                  / DABOW
                </Text>
              </Button>
              <Button py="4" border="1px" borderColor="black" size="sm" rounded="full" bg="white" zIndex={'30'}>
                <Icon color="gray.500" h="4" w="4" as={IconArrowRight}></Icon>
              </Button>
            </Flex>
            <Image border="1px" borderColor={'black'} inset={'1'} rounded="3xl" h="11rem" objectFit={'cover'} src="/dabow.jpg" />
            <Box right="5" bottom="12" textAlign={'end'} position={'relative'}>
              <Icon shadow="md" border="4px" rounded="xl" borderColor="white" h="8" w="11" as={AR} />
            </Box>
          </Box>
        </Flex>
      </Container>
      <Image
        opacity={'50%'}
        top="24"
        left="72%"
        maxH="50rem"
        position={'absolute'}
        objectFit={'contain'}
        style={{ filter: 'invert(0.75)' }}
        src="/heddot.png"
      />
    </Box>
  );
};

export default ExploreHeader;
