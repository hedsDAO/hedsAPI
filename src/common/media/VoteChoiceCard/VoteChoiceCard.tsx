import { store } from '@/store';
import { GridItem, Skeleton, Text, useBoolean } from '@chakra-ui/react';
import { Action } from '@rematch/core';
import { Choice } from 'hedsvote';
import { useSelector } from 'react-redux';

const VoteChoiceCard = ({ choice, onClick }: { choice: Choice; onClick: Function }) => {
  const [isImageLoaded, setIsImageLoaded] = useBoolean();
  const currentTrack = useSelector(store.select.voteModel.selectCurrentTrack);
  return (
    <GridItem
      onClick={() => onClick(choice)}
      className="group transition-all ease-in-out bs-preset-1"
      // bg={currentTrack?.media === choice?.media ? 'white' : 'blackAlpha.100'}
      _hover={{ bg: 'white', borderColor: 'gray.800' }}
      border={'1px'}
      borderColor={'gray.600'}
      rounded="sm"
      minW="full"
      p={2}
      colSpan={1}
    >
      <Skeleton startColor="gray.100" endColor="gray.500" rounded="lg" isLoaded={isImageLoaded} className="aspect-square">
        <img
          onLoad={setIsImageLoaded.on}
          loading="eager"
          src={choice?.image}
          className="group-hover:saturate-[50%] ease-in-out transition-all object-cover aspect-square rounded-md object-center shadow-md outline-neutral-600 outline-1 outline"
        />
      </Skeleton>
      <Text
        fontSize={'0.55rem'}
        className="mx-1 mt-2 truncate md:max-w-[30ch] max-w-[20ch] font-semibold font-serif tracking-wide group-hover:text-gray-900 text-gray-600"
      >
        {choice.name}
      </Text>
    </GridItem>
  );
};

export default VoteChoiceCard;
