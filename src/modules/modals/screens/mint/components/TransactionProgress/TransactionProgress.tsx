import { LabelBadge } from '@/common/badges';
import { Center, Divider, Flex, Spinner } from '@chakra-ui/react';
import { Fragment } from 'react';

const TransactionProgress = () => {
  return (
    <Fragment>
      <Center className="animate__animated animate__zoomIn" width={'full'} height={'2xs'} color="white">
        <Flex alignItems={'center'} direction={'column'} gap={8}>
          <Spinner thickness="3px" speed="0.5s" emptyColor="gray.300" color="blackAlpha.500" size="lg" />
          <LabelBadge label="status" text="processing" textColor={'orange.500'} />
        </Flex>
      </Center>
      <Divider my={3} />
    </Fragment>
  );
};

export default TransactionProgress;
