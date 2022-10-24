import { Link, Button, Divider, Flex, Heading, Image, Stack, Text, Avatar, IconButton } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { useParams } from 'react-router-dom';
import { formatTime, formatWallet } from '@/utils';

export const HedsTape = () => {
  const dispatch = useDispatch<Dispatch>();
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const { hedsTapes, currentTape } = useSelector((state: RootState) => state.tapesModel);

  return (
    <div className="max-w-7xl mx-auto">
      <Flex
        justifyContent={'center'}
        alignItems="center"
        maxWidth={'7xl'}
        mx={'auto'}
        flexDirection={['column', 'column', 'column', 'row']}
        gap={8}
        px={[10, 6, 4, 2]}
        py={4}
      >
        <Stack direction={'column'}>
          <Image className="bs-preset-1" maxH={'18rem'} maxW={'18rem'} minH={'18rem'} minW={'18rem'} rounded="lg" src={hedsTapes?.[id]?.image} />
        </Stack>
        <Stack direction={'column'} spacing="2" width={'full'} alignItems={['center', 'center', 'center', 'start']} justifyContent="center">
          <Text fontWeight={'semibold'} fontSize={'4xl'}>
            {hedsTapes?.[id]?.name}
          </Text>
          <Flex pb={3} gap={2}>
            <Button as={Link} to={{ pathname: hedsTapes?.[id]?.opensea }} bg={'twitter.200'} size={'xs'} leftIcon={<i className="fak fa-opensea text-xs" />}>
              OpenSea
            </Button>
            <Button as={Link} to={{ pathname: hedsTapes?.[id]?.etherscan }} bg={'gray.200'} size={'xs'} leftIcon={<i className="fak fa-etherscan text-xs" />}>
              Etherscan
            </Button>
          </Flex>
          <Text textAlign={['center', 'center', 'center', 'start']} fontWeight={'light'} fontSize={'xs'} maxWidth={'md'}>
            {hedsTapes?.[id]?.description}
          </Text>
        </Stack>
      </Flex>
      <Divider my={5} />
      <Heading maxWidth={'7xl'} textAlign={['center', 'center', 'center', 'start']}>
        Sample Curator
      </Heading>
      <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={'column'} gap={2} px={[10, 6, 4, 0]} py={4}>
        <Flex
          as={Button}
          key={currentTape?.curator?.wallet + space + tape + id}
          onClick={() => {
            dispatch.audioModel.setIsShowingPlayer(true);
            dispatch.audioModel.pushToQueue(currentTape?.curator?.samples?.[space]?.[tape]?.[id]);
          }}
          justify={'space-between'}
        >
          <Flex gap={2} alignItems={'center'}>
            <Avatar src={currentTape?.curator?.profilePicture} size={'sm'} />
            <Flex direction={'column'} alignItems="start">
              <Text fontSize={'xs'}>{currentTape?.curator?.displayName}</Text>
              <Text fontSize={'2xs'}>{currentTape?.curator?.wallet && formatWallet(currentTape?.curator?.wallet)}</Text>
            </Flex>
          </Flex>
          <Flex>
            <Text fontSize={'2xs'}>{formatTime(currentTape?.curator?.samples?.[space]?.[tape]?.[id]?.duration)}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Divider my={5} />
      <Heading maxWidth={'7xl'} textAlign={['center', 'center', 'center', 'start']}>
        Tracks
      </Heading>
      <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={'column'} gap={2} px={[10, 6, 4, 0]} py={4}>
        {currentTape?.tracks?.map((track) => {
          return (
            <Flex
              as={Button}
              key={track.wallet + space + tape + id}
              onClick={() => {
                dispatch.audioModel.setIsShowingPlayer(true);
                dispatch.audioModel.pushToQueue(track?.tracks?.[space]?.[tape]?.[id]);
              }}
              justify={'space-between'}
            >
              <Flex gap={2} alignItems={'center'}>
                <Avatar src={track.profilePicture} size={'sm'} />
                <Flex direction={'column'} alignItems="start">
                  <Text fontSize={'xs'}>{track.displayName}</Text>
                  <Text fontSize={'2xs'}>{formatWallet(track.wallet)}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Text fontSize={'2xs'}>{formatTime(track.tracks?.[space]?.[tape]?.[id]?.duration)}</Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </div>
  );
};
