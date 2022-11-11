import { Checkbox, Flex, Text } from '@chakra-ui/react';

const CheckBoxDisclaimer = ({ onChange, text }: { onChange: Function; text: string }) => {
  return (
    <Checkbox as={Flex} alignItems="start" mt={8} onChange={() => onChange()}>
      <Text mt={'-0.075rem'} fontSize={'xs'}>
        {text}
      </Text>
    </Checkbox>
  );
};

export default CheckBoxDisclaimer;
