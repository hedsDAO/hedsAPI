import { useSelector } from 'react-redux';
import { selectCurrentTapeCover, selectCurrentTapeCurator, selectCurrentTapeName } from '@/pages/tapes/store/selectors';
import { Avatar, AvatarGroup, Flex, Text } from '@chakra-ui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const TapeAndCurator = () => {
  const tapeName = useSelector(selectCurrentTapeName);
  const tapeCover = useSelector(selectCurrentTapeCover);
  const curator = useSelector(selectCurrentTapeCurator);
  return (
    <Flex data-testid="sample-tape-curator" direction={'row'} alignItems={'center'} w={{ base: 'full', lg: 'unset' }} gap={3}>
      <AvatarGroup size={{ base: 'sm', lg: 'md' }} max={2}>
        <Avatar name={curator?.displayName} src={curator?.profilePicture} />
        <Avatar name={tapeName} src={tapeCover} />
      </AvatarGroup>
      <Flex alignItems={'baseline'} gap={2}>
        <Text fontWeight={'semibold'} fontSize={{ base: 'md', lg: 'lg' }}>
          {curator?.displayName}
        </Text>
        <XMarkIcon width="11" height="11" />
        <Text fontWeight={'semibold'} fontSize={{ base: 'md', lg: 'lg' }}>
          {tapeName}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TapeAndCurator;
