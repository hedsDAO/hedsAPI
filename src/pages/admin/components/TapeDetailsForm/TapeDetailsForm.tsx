import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

import { Box, Stack, Flex } from '@chakra-ui/react';
import { CustomUpload } from '@pages/admin/components/CustomUpload/CustomUpload';
import { CustomFormInput } from '@pages/admin/components/CustomFormInput/CustomFormInput';
import { NextStepButton } from '@pages/admin/components/NextStepButton/NextStepButton';

export const TapeDetailsForm = ({ goToNext }: { goToNext: () => void }) => {
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
        <CustomUpload label="Upload Cover" onChange={handleFileChange} fileName={fileName} acceptFileType="image/*" />
        <CustomFormInput label="Title" placeholder="what's the title?" value={name} onChange={(e) => setName(e.target.value)} />
        <CustomFormInput
          label="Description"
          placeholder="write a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          formType="textarea"
        />
        <CustomFormInput label="BPM" placeholder="tempo?" value={bpm} onChange={(e) => setBpm(e.target.value)} />
        <CustomFormInput
          label="Type of Tape"
          value={tapeType}
          onChange={(e) => setTapeType(e.target.value)}
          formType="select"
          options={[
            { value: 'hedstape', label: 'hedsTAPE' },
            { value: 'collabtape', label: 'collabTAPE' },
          ]}
        />
        <Flex justifyContent="flex-end" mt={12}>
          <NextStepButton onClick={handleClick} disabled={formValidation()} text="NEXT" includeIcon />
        </Flex>
      </Stack>
    </Box>
  );
};
