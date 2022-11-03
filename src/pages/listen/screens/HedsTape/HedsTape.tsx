import { Divider, Container } from '@chakra-ui/react';
import { Header, Timeline, Tracks } from '@/pages/listen/components';
import { ViewTapesButton } from '@/common/buttons';

export const HedsTape = () => {
  return (
    <Container maxW="7xl">
      <ViewTapesButton />
      <Header />
      <Divider my={5} />
      <Timeline />
      <Divider my={5} />
      <Tracks />
    </Container>
  );
};
