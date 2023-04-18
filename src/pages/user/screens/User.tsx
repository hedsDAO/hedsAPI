import { useEffect } from 'react';
import { Dispatch, store } from '@/store';
import { Box, Flex, Image, Icon, Stack, Text, Link, Button, SimpleGrid, GridItem, Grid } from '@chakra-ui/react';
import { IconBrandTwitter } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const User = () => {
  const dispatch = useDispatch<Dispatch>();
  const user = useSelector(store.select.userModel.selectUser);
  const { wallet } = useParams();

  useEffect(() => {
    console.log(wallet, 'id');
    if (wallet?.length) dispatch.userModel.getUser(wallet);
  }, [wallet]);

  return (
    <Box>
      <Image mt={'-24'} objectFit={'cover'} w="100vw" src={user?.banner} />
      <Flex mt={2} maxW="6xl" mx="auto" justifyContent={'space-between'}>
        <Flex gap={6}>
          <Image ml={'-16'} rounded="full" mt="-24" w="200px" h="200px" src={user?.profile_picture} />
          <Stack>
            <Text fontFamily={'poppins'} fontWeight="bold" color="white" fontSize="4xl">
              {user?.display_name}
            </Text>
            <Flex mt="0 !important" gap={1} alignItems={'end'}>
              <Text mt="0 !important" fontFamily={'inter'} color="white" opacity={'60%'}>
                {user?.description}
              </Text>
              <Link mt={'0 !important'} target="_blank" href={`https://www.twitter.com/${user?.twitter_handle}`}>
                <Icon aria-label="twitter" as={IconBrandTwitter} color="heds.400" mt={'-0.5'} ml={1} />
              </Link>
            </Flex>
          </Stack>
        </Flex>
        <Stack>
          <Flex gap={2} alignItems={'baseline'}>
            <Text letterSpacing={'widest'} fontFamily={'poppins'} fontWeight="bold" color="heds.400" fontSize="4xl">
              72
            </Text>
            <Text fontSize={'lg'} opacity={'30%'} color="white" className="fas fa-info-circle" as={'i'}></Text>
          </Flex>
          <Button
            mt={'0 !important'}
            as={Link}
            target="_blank"
            _hover={{ bg: 'heds.300', color: 'heds.bg' }}
            href={`https://www.etherscan.com/address/${user?.wallet}`}
            border="solid 1px"
            color="heds.300"
            borderColor="heds.300"
            bg="heds.bg"
            size="xs"
          >
            {user?.wallet?.slice(0, 6)}
          </Button>
        </Stack>
      </Flex>
      <Grid mt={20} gap={5} maxW={'6xl'} mx="auto" templateRows="repeat(2, 1fr)" templateColumns="repeat(3, 1fr)">
        <GridItem minH="60vh" px={5} py={3} as={Stack} w="full" h="full" bg="heds.bg2" colSpan={1} rowSpan={2}>
          <Text fontSize="lg" letterSpacing={'widest'} fontFamily={'poppins'} fontWeight="bold" color="white">
            RECENT
          </Text>
        </GridItem>
        <GridItem w="full" h="full" bg="heds.bg2" colSpan={2} rowSpan={1}>
          <Flex p={5}>
            <Image maxW='18vw' objectFit={'cover'} src={user?.spotlight?.cover} />
            <Stack>
              <Text>{user?.spotlight?.submission_data?.subId}</Text>
            </Stack>
          </Flex>
        </GridItem>
        <GridItem w="full" h="full" bg="heds.bg2" colSpan={2} rowSpan={1}>
          x
        </GridItem>
      </Grid>
    </Box>
  );
};
