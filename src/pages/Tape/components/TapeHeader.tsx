import { Tape, User } from '@/models/common';
import { Box, Button, Divider, Flex, Grid, GridItem, Image, Stack, Text } from '@chakra-ui/react';
import { User as UserComponent } from '@/common';

const TapeHeader = ({ tape, curator }: { tape: Tape; curator: User }) => {
  return (
    <Box>
      <Grid display={{ base: 'none', lg: 'grid' }} templateColumns={'repeat(7, 1fr)'}>
        <GridItem p={7} colSpan={3}>
          <Image rounded="10" shadow="md" src={tape.image} />
        </GridItem>
        <GridItem as={Stack} colStart={5} colSpan={2} justifyContent={'center'}>
          {/* <Box letterSpacing={'widest'} fontSize={'lg'} color={'blackAlpha.600'}>
            TAPE
          </Box> */}
          <Box fontFamily={"'Space Mono', monospace"} mt={'0 !important'} letterSpacing={'widest'} fontSize={'4xl'}>
            {tape.name}
          </Box>
          <Flex pt={2} gap={2}>
            <Text letterSpacing={'widest'} fontSize={'md'} color={'blackAlpha.600'}>
              RELEASED
            </Text>
            <Text fontSize={'md'} color={'blackAlpha.900'}>
              {'03 / 12 / 23'}
            </Text>
          </Flex>
          <Stack pt={8} gap={2}>
            <Text letterSpacing={'widest'} fontSize={'md'} color={'blackAlpha.600'}>
              CURATED BY
            </Text>
            <UserComponent user={curator} />
            <Flex pt={10} gap={2} alignItems={'center'}>
              <Button rounded="full" color="blackAlpha.800" fontWeight={'medium'} px={3} py={1} size="xs" bg="blackAlpha.200">
                <i className="fa-regular fa-file-arrow-down"></i>
              </Button>
              <Text letterSpacing={'widest'} fontSize={'md'} color={'blackAlpha.600'}>
                SAMPLE
              </Text>
            </Flex>
          </Stack>
        </GridItem>
      </Grid>
      <Stack display={{ base: 'flex', lg: 'none' }}>
        <Flex px={4} justifyContent={'space-between'}>
          <Stack>
            <Box letterSpacing={'widest'} fontSize={'md'} color={'blackAlpha.600'}>
              TAPE
            </Box>
            <Box mt={'0 !important'} letterSpacing={'widest'} fontSize={'xl'}>
              {tape.name}
            </Box>
          </Stack>
          <Stack alignItems={'end'}>
            <Box letterSpacing={'widest'} fontSize={'sm'} color={'blackAlpha.600'}>
              RELEASED
            </Box>
            <Box fontSize={'lg'} color={'blackAlpha.900'}>
              {'03 / 12 / 23'}
            </Box>
          </Stack>
        </Flex>
        <Image src={tape.image} />
        <Flex justifyContent={'space-between'} alignItems={'center'} gap={4} px={4}>
          <UserComponent user={curator} />
          <Flex alignItems={'center'} gap={2}>
            <Text letterSpacing={'widest'} fontSize={'xs'} color={'blackAlpha.600'}>
              SAMPLE
            </Text>
            <Button rounded="full" color="blackAlpha.800" fontWeight={'medium'} px={3} py={1} size="xs" bg="blackAlpha.200">
              <i className="fa-regular fa-file-arrow-down"></i>
            </Button>
          </Flex>
        </Flex>
        <Divider />
      </Stack>
    </Box>
  );
};

export default TapeHeader;
