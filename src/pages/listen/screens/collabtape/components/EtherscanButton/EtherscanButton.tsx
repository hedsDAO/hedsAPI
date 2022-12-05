import { store } from '@/store';
import { Button, Link } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const EtherscanButton = () => {
  const etherscan = useSelector(store.select.tapesModel.selectCurrentTapeEtherscanLink);
  return (
    <Button
      as={Link}
      href={etherscan}
      target="_blank"
      bg={'gray.50'}
      border={'solid 1px'}
      borderColor="gray.100"
      rounded="lg"
      size={'xs'}
      leftIcon={<i className="fak fa-etherscan text-xs" />}
    >
      Etherscan
    </Button>
  );
};
export default EtherscanButton;
