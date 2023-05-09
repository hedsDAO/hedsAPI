import { useSelector } from 'react-redux';
import { Avatar, Button, Stack, Text } from '@chakra-ui/react';
import { store } from '@/store';

export const TapeDetails = () => {
  const tape = useSelector(store.select.tapeModel.selectCurrentTape);

  return (
    <Stack gap={3} justifyContent="center" width={{ sm: '100%', md: '80%', lg: '30%' }}>
      <Text color="#D3D3FF" letterSpacing="widest" fontSize="3xl" fontWeight="bold">
        {tape.name}
      </Text>
      {tape.sampleArtists.map((artist) => (
        <Stack key={artist.id} direction="row" alignItems="center">
          <Avatar src={artist.profile_picture} name={artist.display_name} />
          <Text color="white" fontSize="sm">
            {artist.display_name}
          </Text>
        </Stack>
      ))}
      <Button
        color="white"
        width={['100%', '50%']}
        bgColor="black"
        border="1px"
        borderColor="#745CBA"
        fontFamily="sans-serif"
        fontWeight="light"
        leftIcon={<i className="fa-solid fa-arrow-down-to-line" style={{ color: '#745CBA' }} />}
        fontSize="xs"
      >
        DOWNLOAD SAMPLE
      </Button>
      <Text color="white" fontSize="lg" fontWeight="bold">
        About The Tape
      </Text>
      <Text color="white" fontSize="xs" lineHeight="20px">
        {tape.description}
      </Text>
    </Stack>
  );
};
