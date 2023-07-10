import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import { Box, Button, FormControl, FormLabel, Flex, Input, Icon, Stack, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export const SampleDetails = ({ goToPrevious, goToNext }: { goToPrevious: () => void; goToNext: () => void }) => {
  const [wallet, setWallet] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [trackName, setTrackName] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();

  const handleClick = () => {
    dispatch.adminModel.setCuratorWallet(wallet);
    dispatch.adminModel.setSampleDetails({ trackName, duration });
    goToNext();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch.adminModel.uploadSampleAudio(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const formValidation = () => {
    // if (!wallet || !fileName || !trackName || !duration) {
    //   return true;
    // }
    return false;
  };

  return (
    <Box w="full" mt={6}>
      <Stack spacing={5} pl={12}>
        <FormControl>
          <FormLabel color="white">Upload Sample</FormLabel>
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
            <Input type="file" id="upload" accept=".mp3,audio/*" onChange={handleFileChange} hidden />
            <Button as="label" htmlFor="upload" borderRadius="full" padding="1em" variant="unstyled" cursor="pointer" onClick={() => inputRef.current?.click()}>
              <Icon as={AddIcon} boxSize={6} color="gray.200" />
            </Button>
            <Text marginTop="1em" fontSize="sm" isTruncated color="gray.400" flexWrap="wrap">
              {fileName ? fileName : 'no file selected'}
            </Text>
          </Box>
        </FormControl>
        <FormControl>
          <FormLabel color="gray.200">Sample Title</FormLabel>
          <Input
            placeholder="what's the sample title?"
            variant="flushed"
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderColor="gray.400"
            color="white"
            value={trackName}
            onChange={(e) => setTrackName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="white">Curator Wallet Address</FormLabel>
          <Input
            placeholder="0x420..."
            variant="flushed"
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderColor="gray.400"
            color="white"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="gray.200">Submission Duration (seconds)</FormLabel>
          <Input
            placeholder="60"
            variant="flushed"
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderColor="gray.400"
            color="white"
            value={duration}
            type="number"
            onChange={(e) => setDuration(e.target.value)}
          />
        </FormControl>
        <Flex justifyContent="space-between" mt={12}>
          <Button onClick={goToPrevious}>BACK</Button>
          <Button colorScheme="purple" onClick={handleClick} isDisabled={formValidation()}>
            NEXT
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};
