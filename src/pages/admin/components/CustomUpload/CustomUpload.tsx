import { useRef } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Icon, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface OwnProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string;
  acceptFileType: string;
}

export const CustomUpload = ({ label, onChange, fileName, acceptFileType }: OwnProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <FormControl>
      <FormLabel color="gray.200" fontFamily="mono" fontWeight="semibold" fontSize="sm" letterSpacing="tight">
        {label}
      </FormLabel>
      <Box
        border="2px dashed"
        borderColor="gray.200"
        borderRadius="lg"
        padding="1em"
        width="200px"
        height="200px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Input type="file" id="upload" accept={acceptFileType} onChange={onChange} hidden />
        <Button as="label" htmlFor="upload" borderRadius="full" padding="1em" variant="unstyled" cursor="pointer" onClick={() => inputRef.current?.click()}>
          <Icon as={AddIcon} boxSize={6} color="gray.200" />
        </Button>
        <Text marginTop="1em" fontSize="sm" isTruncated color="gray.400" flexWrap="wrap">
          {fileName ? fileName : 'no file selected'}
        </Text>
      </Box>
    </FormControl>
  );
};
