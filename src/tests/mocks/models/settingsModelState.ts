import { SettingsModelState } from '@/modals/screens/settings/models/common';
import { user } from '@/tests/mocks/data/user';

export const settingsModelState: SettingsModelState = {
  userData: user,
  descCharacters: 20,
  descriptionError: '',
  bannerFile: new File([''], 'banner.png', { type: 'image/png' }),
  bannerFileType: '.png',
  bannerPreview: 'https://example.com/banner_preview.png',
  bannerError: 'max size is 5mb',
  profilePictureFile: new File([''], 'profile_picture.png', { type: 'image/png' }),
  profilePictureFileType: '.png',
  profilePicturePreview: 'https://example.com/profile_picture_preview.png',
  profilePictureError: 'invalid file type',
  twitterHandleCharacters: 18,
  twitterHandleError: '',
  error: '',
  isLoading: false,
};
