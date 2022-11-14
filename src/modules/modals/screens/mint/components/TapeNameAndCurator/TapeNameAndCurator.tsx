import { selectCurrentTapeCover, selectCurrentTapeCurator, selectCurrentTapeName } from '@/pages/tapes/store/selectors';
import { Avatar, AvatarGroup, Box, Container, Divider, Heading, HStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const TapeNameAndCurator = () => {
  const cover = useSelector(selectCurrentTapeCover);
  const name = useSelector(selectCurrentTapeName);
  const curator = useSelector(selectCurrentTapeCurator);
  return (
    <Box bg="bg-surface">
      <Container>
        <HStack gap={1}>
          <Heading fontSize="3xl" fontWeight="light" letterSpacing={'wide'} whiteSpace="nowrap">
            {name}
          </Heading>
          <Divider />
          <AvatarGroup size={'sm'} max={2}>
            <Avatar name={curator?.displayName} src={curator?.profilePicture} />
            <Avatar name={name} src={cover} />
          </AvatarGroup>
        </HStack>
      </Container>
      <Divider my={4} />
    </Box>
  );
};

export default TapeNameAndCurator;
