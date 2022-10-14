import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { Button, Flex, FormControl, FormLabel, Image } from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { IconUpload } from '@tabler/icons';

const BannerForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();
  const userData = useSelector((state: RootState) => state.userModel);
  const { bannerPreview, bannerFile, profileChanges } = useSelector((state: RootState) => state.settingsModel);
  const handleClick = () => inputRef.current.click();
  return (
    <FormControl>
      <FormLabel width={'nowrap'}>Banner</FormLabel>
      <Flex justifyContent={{ base: 'center', md: 'start' }} direction={{ base: 'column', sm: 'column' }} gap={2} alignItems={'start'}>
        <Image width={'lg'} borderRadius={'lg'} objectFit={'fill'} src={bannerPreview || profileChanges?.banner || userData?.banner} />
        <Flex pt={1} width={{ base: 'full', sm: 'auto' }} gap={2}>
          <input ref={inputRef} onChange={(e) => dispatch.settingsModel.handleBannerUpload(e)} type="file" className="hidden" />
          <Button px={4} size="sm" onClick={() => handleClick()} bg={'green.200'} rounded="full">
            <IconUpload className="h-3 w-3" />
          </Button>
          <Button
            px={4}
            size="sm"
            onClick={() => {
              if (bannerFile) inputRef.current.value = '';
              dispatch.settingsModel.deleteBanner([profileChanges.banner, bannerPreview]);
            }}
            rounded="full"
            bg={'red.200'}
          >
            <TrashIcon className="h-3 w-3" />
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  );
};

export default BannerForm;
