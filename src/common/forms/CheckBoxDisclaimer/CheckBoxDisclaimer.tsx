import { Checkbox, Flex, Text } from '@chakra-ui/react';

const CheckBoxDisclaimer = ({ onChange, disclaimer }: { onChange: Function; disclaimer: string }) => {
  return (
    <Checkbox as={Flex} alignItems="start" mt={8} onChange={() => onChange()}>
      <Text mt={'-0.075rem'} fontSize={'xs'}>
        {disclaimer}
      </Text>
    </Checkbox>
  );
};

export default CheckBoxDisclaimer;
