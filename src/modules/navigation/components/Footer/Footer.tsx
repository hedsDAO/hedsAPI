import { RootState } from '@/store';
import { Avatar, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const globalLoading = useSelector((state: RootState) => state.loading.global);
  return (
    <Fragment>
      {!globalLoading && (
        <Flex
          alignItems={'center'}
          justifyContent={{ base: 'space-between', lg: 'space-around' }}
          px={12}
          mt={10}
          mb={5}
          gap={5}
          fontFamily={"'Space Mono', monospace"}
          fontSize={'xs'}
          h="12"
          minW="100vw"
        >
          <Text>heds 2023</Text>
          <HStack gap={1}>
            <Link aria-label="discord" href="https://discord.com/invite/YPuAbCcDtg" target="_blank">
              <i className="fa-brands fa-discord" />
            </Link>
            <Link aria-label="twitter" href="https://twitter.com/hedsDAO" target="_blank">
              <i className="fa-brands fa-twitter" />
            </Link>
          </HStack>
        </Flex>
      )}
    </Fragment>
  );
};

export default Footer;
