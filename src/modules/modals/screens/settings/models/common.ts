import { User } from '@/models/common';

/**
 * @name SettingsModal
 * @summary types, text and data used for the profile settings modal.
 *
 */

export class SettingsModalState {
  profileChanges: User;
  isLoading = false;
  error = '';
  bannerFile: File;
  bannerFileType: string;
  bannerPreview: string;
  profilePictureFile: File;
  profilePictureFileType: string;
  profilePicturePreview: string;
  descCharacters: number;
  nameCharacters: number;
}
