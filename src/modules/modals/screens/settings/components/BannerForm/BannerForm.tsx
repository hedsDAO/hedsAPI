import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { Flex, FormControl, FormLabel, Image, Text } from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { BANNER_TITLE, BANNER_DESCRIPTION, UPLOAD_BUTTON_TEXT } from '../../models/constants';
import { PrimaryButton, WarningButton } from '@/common/buttons';

const BannerForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();
  const { connectedUser: userData } = useSelector((state: RootState) => state.userModel);
  const { bannerPreview, bannerFile, profileChanges, isLoading } = useSelector((state: RootState) => state.settingsModel);
  const handleClick = () => inputRef.current.click();
  return (
    <FormControl>
      <FormLabel mb={3} width={'nowrap'}>
        {BANNER_TITLE}
        <Text fontWeight="light" textColor={'gray.700'} fontSize={'xs'}>
          {BANNER_DESCRIPTION}
        </Text>
      </FormLabel>
      <Flex
        data-testid="banner-form"
        justifyContent={{ base: 'center', md: 'start' }}
        direction={{ base: 'column', sm: 'column' }}
        gap={2}
        alignItems={'start'}
      >
        <Image h="16" width={'lg'} borderRadius={'md'} objectFit={'fill'} src={bannerPreview || profileChanges?.banner || userData?.banner} />
        <Flex pt={1.5} width={{ base: 'full', sm: 'auto' }} gap={2}>
          <input ref={inputRef} onChange={(e) => dispatch.settingsModel.handleBannerUpload(e)} type="file" className="hidden" />
          <PrimaryButton disabled={isLoading} isLoading={isLoading} onClick={() => handleClick()} size="xs">
            {UPLOAD_BUTTON_TEXT}
          </PrimaryButton>
          <WarningButton
            size="xs"
            onClick={() => {
              if (bannerFile) inputRef.current.value = '';
              dispatch.settingsModel.deleteBanner([profileChanges.banner, bannerPreview]);
            }}
          >
            <TrashIcon className="h-3 w-3" />
          </WarningButton>
        </Flex>
      </Flex>
    </FormControl>
  );
};

export default BannerForm;
