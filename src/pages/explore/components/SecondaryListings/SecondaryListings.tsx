import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Divider, Flex, Grid, Heading, HStack, Image, Skeleton, Text } from '@chakra-ui/react';
import { formatWallet } from '@/utils';
import Marquee from 'react-fast-marquee';
import { Fragment } from 'react';
import OpenSeaTapeCard from '@/common/media/OpenSeaTapeCard/OpenSeaTapeCard';

const SecondaryListings = () => {
  const allTapes = useSelector(store.select.tapesModel.selectAllTapes);
  const secondaryListings = useSelector(store.select.exploreModel.selectLatestSecondaryListings);
  const tapeSlugMapping = [
    ['heds', 'hedstape', '10'],
    ['heds', 'hedstape', '9'],
  ];
  return (
    <Fragment>
      {secondaryListings?.length && (
        <Container className="max-w-sm pb-5">
          <Box mb={5}>
            <Container py={{ base: '4', md: '8' }}>
              <HStack>
                <Divider borderColor="gray.700" w="full" />
                <Text fontSize="lg" fontWeight="semibold" whiteSpace="nowrap" letterSpacing={'widest'}>
                  LATEST LISTINGS
                </Text>
                <Divider borderColor="gray.700" w="full" />
              </HStack>
            </Container>
          </Box>
          <Grid templateColumns={'repeat(8, 1fr)'}>
            {secondaryListings.map((listData, index: number) => {
              console.log(listData);
              return <OpenSeaTapeCard tape={allTapes?.[tapeSlugMapping[index][1]]?.[tapeSlugMapping[index][2]]} />;
            })}
          </Grid>
        </Container>
      )}
    </Fragment>
  );
};

export default SecondaryListings;
