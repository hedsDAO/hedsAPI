import { Badge, Box, Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import { User as UserComponent } from '@/common';
import { Tape, User } from '@/models/common';
import { mockTapeArtists } from '../models/constant';

const TapeDetails = ({ curator, tape }: { curator: User; tape: Tape }) => {
  return (
    <Box pb={10}>
      <Grid px={10} templateColumns={{base: 'repeat(2, 1fr)', lg:'repeat(4, 1fr)'}}>
        <GridItem colSpan={2}>
          <Stack pt={8} gap={2}>
            <Text letterSpacing={'widest'} fontSize={'md'} fontWeight={'semibold'} color={'blackAlpha.800'}>
              CURATED BY
            </Text>
            <UserComponent user={curator} />
          </Stack>
          <Flex pt={10} gap={3} alignItems={'center'}>
            <Text fontWeight={'semibold'} letterSpacing={'widest'} fontSize={'md'} color={'blackAlpha.800'}>
              RELEASE TYPE
            </Text>
            <Badge colorScheme={'green'}>HEDSTAPE</Badge>
          </Flex>
          <Stack>
            <Flex pt={10} gap={3} alignItems={'center'}>
              <Text fontWeight={'semibold'} letterSpacing={'widest'} fontSize={'md'} color={'blackAlpha.800'}>
                CONTRACT MINT DATE
              </Text>
              <Text letterSpacing={'widest'} fontSize={'md'} color={'blackAlpha.700'}>
                2/3/2023
              </Text>
            </Flex>
            <Flex gap={3} alignItems={'center'}>
              <Text fontWeight={'semibold'} letterSpacing={'widest'} fontSize={'md'} color={'blackAlpha.800'}>
                SECONDARY SALES
              </Text>
              <Text letterSpacing={'widest'} fontSize={'md'} color={'blackAlpha.700'}>
                9999 ETH
              </Text>
            </Flex>
            <Flex gap={3} alignItems={'center'}>
              <Text fontWeight={'semibold'} letterSpacing={'widest'} fontSize={'md'} color={'blackAlpha.800'}>
                EDITIONS SOLD
              </Text>
              <Text letterSpacing={'widest'} fontSize={'md'} color={'blackAlpha.700'}>
                9999
              </Text>
            </Flex>
            <Flex gap={3} alignItems={'center'}>
              <Text fontWeight={'semibold'} letterSpacing={'widest'} fontSize={'md'} color={'blackAlpha.800'}>
                PRIMARY SALES
              </Text>
              <Text letterSpacing={'widest'} fontSize={'md'} color={'blackAlpha.700'}>
                9999 ETH
              </Text>
            </Flex>
            <Flex pt={10} gap={3} alignItems={'center'}>
              <Text fontWeight={'semibold'} letterSpacing={'widest'} fontSize={'md'} color={'blackAlpha.800'}>
                BUY ON SOUND MARKET
              </Text>
              <i className="fa-solid fa-arrow-right"></i>
            </Flex>
          </Stack>
        </GridItem>
        <GridItem colSpan={2}>
          <Text pt={10} maxW="75%" letterSpacing={'widest'} fontSize={'md'} color={'blackAlpha.800'}>
            <span style={{ fontWeight: 'bold' }}>DESCRIPTION</span> {tape.description}
          </Text>
          <Text pb={4} pt={10} letterSpacing={'widest'} fontWeight={'semibold'} fontSize={'md'} color={'blackAlpha.800'}>
            TOP SUPPORTERS
          </Text>
          <Flex display={{base: 'none', lg: 'flex'}} gap={4}>
            {mockTapeArtists.slice(0, 5).map((artist, index) => {
              return <UserComponent key={artist.display_name} user={artist} size={'sm'} />;
            })}
          </Flex>
          <Flex display={{base: 'flex', lg: 'none'}} gap={4}>
            {mockTapeArtists.slice(0, 3).map((artist, index) => {
              return <UserComponent key={artist.display_name} user={artist} size={'sm'} />;
            })}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default TapeDetails;
