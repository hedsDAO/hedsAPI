import { Box, BoxProps, Heading, Image, Skeleton, Stack, useBoolean } from '@chakra-ui/react';

type ImageWithOverlayProps = BoxProps & {
  title: string;
  description?: string;
  url?: string;
  alt?: string;
  src: string;
  spacing?: string;
};

export const ImageWithOverlay = (props: ImageWithOverlayProps) => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean(false);
  const { title, description, url, src, alt, spacing = '8', objectPosition = 'cover', ...rest } = props;

  return (
    <Box borderRadius="sm" overflow="hidden" position="relative" width="full" {...rest}>
      <Image
        onLoad={() => setHasImageLoaded.on()}
        rounded="sm"
        border="1px"
        borderColor={'gray.800'}
        boxSize="full"
        maxHeight={{ base: 'full', md: '100%' }}
        src={src}
        alt={alt}
        objectFit="cover"
        objectPosition={objectPosition}
        fallback={<Skeleton isLoaded={hasImageLoaded} />}
      />
      <Stack maxW="xl" spacing={spacing}>
        <Stack spacing={'2'}>
          <div className="text-xs shadow-sm absolute bottom-2 left-0 py-1 px-3 bg-white bg-opacity-80 rounded-r-sm outline-neutral-900 border-l border-neutral-900 outline-1 outline">
            <Heading fontFamily={'"Space Mono", monospace'} size="xs">
              {title}
            </Heading>
          </div>
        </Stack>
      </Stack>
    </Box>
  );
};
