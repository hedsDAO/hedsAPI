import { TapeAndTrackData, TapeData } from '@/models/common';
import { GridItem, Skeleton, useBoolean, Link } from '@chakra-ui/react';

const OpenSeaTapeCard = ({ tape }: { tape: TapeData | TapeAndTrackData }) => {
  const [isImageLoaded, setIsImageLoaded] = useBoolean();
  // TODO: remove tailwind styles, add chakra components.
  return (
    <GridItem
      as={Link}
      className="group transition-all ease-in-out bs-preset-1"
      href={``}
      bg="blackAlpha.100"
      _hover={{ bg: 'white', borderColor: 'gray.800' }}
      border={'1px'}
      borderColor={'gray.600'}
      rounded="sm"
      p={3}
      colSpan={1}
    >
      <Skeleton
        startColor="gray.100"
        endColor="gray.500"
        w="full"
        h="full"
        className="aspect-square"
        maxW="4rem"
        maxH="4rem"
        // minH={!isImageLoaded ? { base: 'full', sm: '6rem', lg: '11rem', xl: '18.5rem', '2xl': '21rem' } : { base: 'full' }}
        rounded="lg"
        isLoaded={isImageLoaded}
      >
        <div className="relative mb-2">
          <img
            onLoad={setIsImageLoaded.on}
            loading="eager"
            src={tape?.image}
            className={`group-hover:saturate-[50%] 
            ease-in-out transition-all object-cover 
            aspect-square rounded-md object-center 
            shadow-md outline-neutral-600 outline-1 
            outline max-w-[4rem] max-h-[4rem] h-[100%] w-[100%]`}
          />
        </div>
        <span className="mx-1 font-semibold text-xs font-serif tracking-wide group-hover:text-gray-900 text-gray-600">{tape.name}</span>
      </Skeleton>
    </GridItem>
  );
};

export default OpenSeaTapeCard;
