import { Song as SongMetadata, User } from '@/models/common';
import { Box, Flex, Image, Stack, IconButton, Tooltip, useBoolean, Center, VStack, Skeleton, Text } from '@chakra-ui/react';

export const Song = ({ song, artist, index }: { song: SongMetadata; artist: User; index?: number }) => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const [isHovering, setIsHovering] = useBoolean();
  return (
    <Flex
      bg={index && index % 2 === 0 ? 'blackAlpha.50' : 'transparent'}
      onMouseEnter={setIsHovering.on}
      onMouseLeave={setIsHovering.off}
      p={3}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Flex justifyContent={'space-between'}>
        <VStack justifyContent={'center'} pl={2} pr={4}>
          <Skeleton h={'5'} w={'3'} isLoaded={hasImageLoaded}>
            {index && (
              <Text whiteSpace={'nowrap'} fontSize={'xs'}>
                {index}
              </Text>
            )}
          </Skeleton>
        </VStack>
        <Center rounded="sm" bg="gray.400" shadow="sm" role="button" pointerEvents={'auto'}>
          <Skeleton w={{ base: '14', lg: '16' }} h={{ base: '14', lg: '16' }} isLoaded={hasImageLoaded}>
            <Image
              onLoad={setHasImageLoaded.on}
              opacity={isHovering ? '40%' : '100%'}
              transition={'ease-in-out'}
              transitionDuration={'0.2s'}
              shadow={'md'}
              rounded={'md'}
              src={song.cover}
              w={{ base: '14', lg: '16' }}
              h={{ base: '14', lg: '16' }}
            />
          </Skeleton>
          <Box
            color={'white'}
            position={'absolute'}
            zIndex="20"
            opacity={isHovering ? '100' : '0'}
            transition={'ease-in-out'}
            transitionDuration={'0.2s'}
            w={{ base: '15px', lg: '12px' }}
            children={<i className="fa-solid fa-play"></i>}
          />
        </Center>
        <Stack gap={1} justifyContent={'center'} spacing={song.public ? 0 : 1} ml={5}>
          {!hasImageLoaded ? (
            <Skeleton w="10ch" h={'4'} rounded="2xl" isLoaded={true}></Skeleton>
          ) : (
            <Box fontSize={{ base: 'sm', lg: 'md' }}>{JSON.parse(song.submission_data)?.['sub_id']}</Box>
          )}
          {!hasImageLoaded ? (
            <Skeleton w="10ch" h={'4'} rounded="2xl" isLoaded={true}></Skeleton>
          ) : (
            <>
              {song.public ? (
                <Box fontSize={{ base: 'xs', lg: 'sm' }} fontWeight={'light'} color="blackAlpha.700">
                  {artist.display_name}
                </Box>
              ) : (
                <Flex textColor={'gray.300'} gap={1}>
                  <Box bg="gray.300" rounded="xl" w="70%" py={{ base: 1, lg: 1.5 }} />
                  <Tooltip fontSize={'xs'} label="private song" aria-label="private song">
                    <i className="fa-solid fa-circle-info" />
                  </Tooltip>
                </Flex>
              )}
            </>
          )}
        </Stack>
      </Flex>
      <Flex alignItems={'center'} gap={{ base: 0, lg: 1 }}>
        <IconButton
          fontSize={{ base: 'md', lg: 'lg' }}
          bg="transparent"
          color={'blackAlpha.400'}
          _hover={{ color: 'red.500', bg: 'transparent' }}
          aria-label="like"
        >
          <i className="fa-solid fa-heart" />
        </IconButton>
        <IconButton
          fontSize={{ base: 'md', lg: 'lg' }}
          bg="transparent"
          color={'gray.500'}
          _hover={{ color: 'black', bg: 'transparent' }}
          aria-label="view song"
        >
          <i className="fa-solid fa-ellipsis"></i>
        </IconButton>
      </Flex>
    </Flex>
  );
};
