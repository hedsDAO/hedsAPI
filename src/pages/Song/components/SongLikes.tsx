import { User as UserComponent } from '@/common';
import { Pagination } from '@/components/Pagination/Pagination';
import { User } from '@/models/common';
import { Box, Divider, Grid, GridItem } from '@chakra-ui/react';

const SongLikes = ({ users }: { users: User[] }) => {
  return (
    <Box pb={4}>
      <Divider />
      <Grid gap={2} px={{ base: 1, xl: 2 }} py={{ base: 6, xl: 4 }} templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(10, 1fr)' }}>
        {users.map((user) => (
          <GridItem key={user.display_name} colSpan={1}>
            <UserComponent user={user} size="sm" />
          </GridItem>
        ))}
      </Grid>
      {/* <Pagination /> */}
      <Divider />
    </Box>
  );
};

export default SongLikes;
