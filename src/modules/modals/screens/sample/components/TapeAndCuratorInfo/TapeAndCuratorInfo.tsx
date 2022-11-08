import { selectCurrentTapeCover, selectCurrentTapeCurator, selectCurrentTapeName } from '@/pages/tapes/store/selectors';
import { Avatar, AvatarGroup, Divider, Flex, Text } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const TapeAndCuratorInfo = () => {
  const tapeName = useSelector(selectCurrentTapeName);
  const tapeCover = useSelector(selectCurrentTapeCover);
  const curator = useSelector(selectCurrentTapeCurator);
  return (
    <Fragment>
    <Divider my={5} />
    <Flex direction={'row'} alignItems={'center'} w={{ base: 'full', lg: 'unset' }} gap={3}>
      <AvatarGroup size={{ base: 'md', lg: 'md' }} max={2}>
        <Avatar name={tapeName} src={tapeCover} />
        <Avatar name={curator?.displayName} src={curator?.profilePicture} />
      </AvatarGroup>
      <Flex alignItems={'start'} gap={1}>
        <Text fontSize={{ base: 'sm', lg: 'md' }}>{tapeName}</Text>
        <Text fontWeight={'normal'} fontSize={{ base: 'sm', lg: 'md' }}>
          x
        </Text>
        <Text fontSize={{ base: 'sm', lg: 'md' }}>{curator?.displayName}</Text>
      </Flex>
    </Flex>
    </Fragment>
  );
};

export default TapeAndCuratorInfo;
