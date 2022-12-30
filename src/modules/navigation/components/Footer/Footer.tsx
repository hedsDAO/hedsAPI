import { RootState } from '@/store';
import { Flex } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const globalLoading = useSelector((state: RootState) => state.loading.global);
  return (
    <Fragment>
      {!globalLoading && (
        <Flex
          justifyContent={{ base: 'center', lg: 'start' }}
          px={12}
          mt={10}
          mb={5}
          fontFamily={"'Space Mono', monospace"}
          fontSize={'xs'}
          className="animate__animated animate__fadeIn animate__delay-3s "
          h="12"
          minW="100vw"
        >
          <>heds 2022</>
        </Flex>
      )}
    </Fragment>
  );
};

export default Footer;
