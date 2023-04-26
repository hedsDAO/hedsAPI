import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Box, Center, Image, Input, Text, useBoolean, VStack } from '@chakra-ui/react';
import { BANNER_FORM_TEXT } from '@/modals/screens/settings/models/constants';
import * as styles from '@/modals/screens/settings/components/BannerForm/styles';

/**
 * @function BannerForm
 * @description Renders a form for users to upload a banner image. Displays a preview of the uploaded image and handles errors.
 * @returns {JSX.Element} - Rendered component.
 **/

export const BannerForm = () => {
  const [isHoveringBanner, setIsHoveringBanner] = useBoolean();
  const dispatch = useDispatch<Dispatch>();
  const banner = useSelector(store.select.authModel.selectBanner);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const bannerPreview = useSelector(store.select.settingsModel.selectBannerPreview);
  const bannerError = useSelector(store.select.settingsModel.selectBannerError);

  useEffect(() => {
    if (!bannerPreview) bannerInputRef.current.value = '';
  }, [bannerPreview]);
  
  return (
    <Box {...styles.$bannerBoxStyles} onMouseEnter={setIsHoveringBanner.on} onMouseLeave={setIsHoveringBanner.off}>
      <Input data-testid='banner-input' ref={bannerInputRef} {...styles.$bannerInputStyles} onChange={(e) => dispatch.settingsModel.handleBannerUpload(e)} />
      <Image data-testid='banner-preview' {...styles.$bannerImageStyles(bannerError, isHoveringBanner)} src={bannerPreview || banner} alt={banner} />
      <Center {...styles.$bannerCenterStyles} onClick={() => bannerInputRef.current?.click()}>
        <VStack {...styles.$bannerVStackStyles}>
          <Text {...styles.$bannerTextStyles(bannerError, isHoveringBanner)}>{bannerError?.length ? bannerError : BANNER_FORM_TEXT}</Text>
        </VStack>
      </Center>
    </Box>
  );
};
