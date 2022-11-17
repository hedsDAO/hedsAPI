import { store } from '@/store';
import { Button, Link } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const OpenSeaButton = () => {
  const opensea = useSelector(store.select.tapesModel.selectCurrentTapeOpenseaLink);
  return (
    <Button
      as={Link}
      href={opensea}
      target="_blank"
      bg={'blue.50'}
      border={'solid 1px'}
      borderColor="blue.100"
      rounded="lg"
      size={'xs'}
      leftIcon={<i className="fak fa-opensea text-xs" />}
    >
      OpenSea
    </Button>
  );
};

export default OpenSeaButton;
