import { selectCurrentTapeCover } from '@/pages/tapes/store/selectors';
import { AspectRatio, Divider, Flex, Image } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const TapeCover = () => {
  const cover = useSelector(selectCurrentTapeCover);

  return (
    <Fragment>
      <Flex maxW="md" direction={'column'}>
        <AspectRatio maxW="md" ratio={3 / 1}>
          <Image rounded={'lg'} src={cover} />
        </AspectRatio>
      </Flex>
      <Divider my={4} />
    </Fragment>
  );
};
export default TapeCover;
