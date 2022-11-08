import { selectCurrentTapeCover, selectCurrentTapeCurator, selectCurrentTapeName } from '@/pages/tapes/store/selectors';
import { Avatar, AvatarGroup, Divider, Flex, Text } from '@chakra-ui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const TapeAndCurator = () => {
  const tapeName = useSelector(selectCurrentTapeName);
  const tapeCover = useSelector(selectCurrentTapeCover);
  const curator = useSelector(selectCurrentTapeCurator);
  return (
    <Fragment>
      <Divider my={5} />
      <Flex direction={'row'} alignItems={'center'} w={{ base: 'full', lg: 'unset' }} gap={3}>
        <AvatarGroup size={{ base: 'sm', lg: 'md' }} max={2}>
          <Avatar name={curator?.displayName} src={curator?.profilePicture} />
          <Avatar name={tapeName} src={tapeCover} />
        </AvatarGroup>
        <Flex alignItems={'baseline'} gap={3}>
          <Text fontWeight={'semibold'} fontSize={{ base: 'md', lg: 'lg' }}>
            {curator?.displayName}
          </Text>
          <XMarkIcon width="11" height="11" />
          <Text fontWeight={'semibold'} fontSize={{ base: 'sm', lg: 'md' }}>
            {tapeName}
          </Text>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default TapeAndCurator;
