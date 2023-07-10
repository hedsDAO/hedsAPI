import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

import { Box, Button, Stack, Select, Flex, FormControl, FormLabel, Icon, Input, Text } from '@chakra-ui/react';
import { AddIcon, ArrowForwardIcon } from '@chakra-ui/icons';

export const TapeDetailsForm = ({ goToNext }: { goToNext: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();

  const [fileName, setFileName] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [bpm, setBpm] = useState<string>('');
  const [tapeType, setTapeType] = useState<string>('hedstape');

  const handleClick = () => {
    dispatch.adminModel.setTapeDetails({ name, description, bpm: Number(bpm), type_type: tapeType });
    goToNext();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch.adminModel.uploadCoverImage(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const formValidation = () => {
    // if (!fileName || !name || !description || !bpm || !tapeType) {
    //   return true;
    // }
    return false;
  };

  return (
    <Box w="full" mt={6}>
      <Stack spacing={5} pl={12}>
        <FormControl>
          <FormLabel color="gray.200" fontFamily="mono" fontWeight="semibold" fontSize="sm" letterSpacing="tight">
            Upload Cover
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
            <Input type="file" id="upload" accept="image/*" onChange={handleFileChange} hidden />
            <Button as="label" htmlFor="upload" borderRadius="full" padding="1em" variant="unstyled" cursor="pointer" onClick={() => inputRef.current?.click()}>
              <Icon as={AddIcon} boxSize={6} color="gray.200" />
            </Button>
            <Text marginTop="1em" fontSize="sm" isTruncated color="gray.400" flexWrap="wrap">
              {fileName ? fileName : 'no file selected'}
            </Text>
          </Box>
        </FormControl>
        <FormControl>
          <FormLabel color="gray.200" fontFamily="mono" fontWeight="semibold" fontSize="sm" letterSpacing="tight">
            Title
          </FormLabel>
          <Input
            placeholder="what's the title?"
            variant="flushed"
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderColor="gray.400"
            color="white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="gray.200" fontFamily="mono" fontWeight="semibold" fontSize="sm" letterSpacing="tight">
            Description
          </FormLabel>
          <Input
            placeholder="write a description..."
            variant="flushed"
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderColor="gray.400"
            color="white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="gray.200" fontFamily="mono" fontWeight="semibold" fontSize="sm" letterSpacing="tight">
            BPM
          </FormLabel>
          <Input
            placeholder="tempo?"
            variant="flushed"
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderColor="gray.400"
            color="white"
            type="number"
            value={bpm}
            onChange={(e) => setBpm(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="gray.200" fontFamily="mono" fontWeight="semibold" fontSize="sm" letterSpacing="tight">
            Type of Tape
          </FormLabel>
          <Select
            bg="white"
            color="gray.800"
            borderRadius="xl"
            w="fit-content"
            placeholder="Select tape type"
            value={tapeType}
            onChange={(e) => setTapeType(e.target.value)}
          >
            <option value="hedstape">hedsTAPE</option>
            <option value="collabtape">collabTAPE</option>
          </Select>
        </FormControl>
        <Flex justifyContent="flex-end" mt={12}>
          <Button
            colorScheme="purple"
            fontFamily="space"
            fontWeight="light"
            letterSpacing="wider"
            borderRadius="lg"
            size="sm"
            rightIcon={<ArrowForwardIcon />}
            onClick={handleClick}
            isDisabled={formValidation()}
          >
            NEXT
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};
