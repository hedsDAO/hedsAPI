import { UserSettingsData } from '@/models/common';
import { User } from '@/models/common';

/**
 * @name SettingsModel
 * @summary types, text and data used for the profile settings modal.
 *
 */

export class SettingsModelState {
  userData: User;
  bannerFile: File;
  bannerError: string;
  bannerFileType: string;
  bannerPreview: string;
  profilePictureFile: File;
  profilePictureError: string;
  profilePictureFileType: string;
  profilePicturePreview: string;
  descCharacters: number;
  descriptionError: string;
  twitterHandleCharacters: number;
  twitterHandleError: string;
  isLoading = false;
  error = '';
}
