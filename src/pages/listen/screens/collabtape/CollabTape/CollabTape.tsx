import { Divider, Container } from '@chakra-ui/react';
import { Header, Tracks, ViewTapesButton, Timeline } from '@/pages/listen/screens/collabtape/components';

export const CollabTape = () => {
  return (
    <Container maxW="7xl" pt={3}>
      <ViewTapesButton />
      <Header />
      <Divider my={5} />
      <Timeline />
      <Divider my={5} />
      <Tracks />
    </Container>
  );
};
