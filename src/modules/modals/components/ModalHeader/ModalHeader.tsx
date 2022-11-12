import { Fragment } from 'react';
import { Dialog } from '@headlessui/react';
import { Circle, Divider, HStack, Text } from '@chakra-ui/react';
import { TablerIcon } from '@tabler/icons';

const ModalHeader = ({ Icon, title }: { Icon: TablerIcon; title: string }) => {
  return (
    <Fragment>
      <Dialog.Title>
        <HStack alignItems={'center'}>
          <Circle size={{ base: '24px', lg: '30px' }} bg="gray.900" color="white" mr={1}>
            <Icon height="14" width="14" />
          </Circle>
          <Text className="text-xl font-semibold text-gray-900 mb-6">{title}</Text>
        </HStack>
      </Dialog.Title>
      <Divider borderColor={'gray.300'} my={4} />
    </Fragment>
  );
};

export default ModalHeader;
