import { LabelBadge } from '@/common/badges';
import { Spinner } from '@chakra-ui/react';

const TransactionProgress = () => {
  return (
    <>
      <Spinner thickness="3px" speed="0.5s" emptyColor="gray.300" color="blackAlpha.500" size="lg" />
      <LabelBadge label="status" text="processing" textColor={'orange.500'} />
    </>
  );
};

export default TransactionProgress;
