import type { RootModel } from '@/models';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateUserSettings } from '@/api/user';
import { storage } from '@/App';
import { SettingsModelState } from '@/modals/screens/settings/models/common';
import { regex } from '@/modals/screens/settings/models/constants';
import { User, UserSettingsData } from '@/models/common';
import { getCurrentImagePath } from '@/utils';
import { createModel } from '@rematch/core';

export const settingsModel = createModel<RootModel>()({
  state: {} as SettingsModelState,
  reducers: {
    setDescription: (state, description: string) => ({ ...state, userData: { ...state.userData, description } }),
    setDescCharacters: (state, descCharacters: number) => ({ ...state, descCharacters }),
    setDescriptionError: (state, descriptionError: string) => ({ ...state, descriptionError }),
    setBanner: (state, banner: string) => ({ ...state, userData: { ...state.userData, banner } }),
    setBannerFile: (state, bannerFile: File) => ({ ...state, bannerFile }),
    setBannerFileType: (state, bannerFileType: string) => ({ ...state, bannerFileType }),
    setBannerPreview: (state, bannerPreview) => ({ ...state, bannerPreview }),
    setBannerError: (state, bannerError: string) => ({ ...state, bannerError }),
    setProfilePicture: (state, profilePicture: string) => ({ ...state, userData: { ...state.userData, profilePicture } }),
    setProfilePictureFile: (state, profilePictureFile: File) => ({ ...state, profilePictureFile }),
    setProfilePictureFileType: (state, profilePictureFileType: string) => ({ ...state, profilePictureFileType }),
    setProfilePicturePreview: (state, profilePicturePreview) => ({ ...state, profilePicturePreview }),
    setProfilePictureError: (state, profilePictureError: string) => ({ ...state, profilePictureError }),
    setUserData: (state, userData: User) => ({ ...state, userData }),
    setError: (state, error: string) => ({ ...state, error }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    clearState: (state) => ({} as SettingsModelState),
  },
  selectors: (slice) => ({
    selectUserData: () => slice((state): User => state.userData),
    selectState: () => slice((state): SettingsModelState => state),
    selectError: () => slice((state): string => state.error),
    selectIsLoading: () => slice((state): boolean => state.isLoading),
    selectDescription: () => slice((state): string => state.userData?.description),
    selectDescCharacters: () => slice((state) => state.descCharacters),
    selectDescriptionError: () => slice((state) => state.descriptionError),
    selectBanner: () => slice((state) => state.userData?.banner),
    selectBannerFile: () => slice((state) => state.bannerFile),
    selectBannerFileType: () => slice((state) => state.bannerFileType),
    selectBannerPreview: () => slice((state) => state.bannerPreview),
    selectBannerError: () => slice((state) => state.bannerError),
    selectProfilePicture: () => slice((state) => state.userData?.profile_picture),
    selectProfilePictureFile: () => slice((state) => state.profilePictureFile),
    selectProfilePictureFileType: () => slice((state) => state.profilePictureFileType),
    selectProfilePicturePreview: () => slice((state) => state.profilePicturePreview),
    selectProfilePictureError: () => slice((state) => state.profilePictureError),
  }),
  effects: (dispatch) => ({
    async handleSubmit([settingsState, currentUserData]: [SettingsModelState, User]) {
      this.setIsLoading(true);
      const { bannerFile, bannerFileType, bannerPreview, profilePictureFile, profilePictureFileType, profilePicturePreview } = settingsState;
      const { profile_picture: prevProfilePicture, banner: prevBanner, wallet, id } = currentUserData;
      const { profile_picture, banner, description } = currentUserData;
      const newUserData = { ...settingsState.userData };
      const updatedUserData = { profile_picture, banner, description } as UserSettingsData;
      if (currentUserData?.description !== newUserData?.description) updatedUserData.description = newUserData?.description;
      if (currentUserData?.profile_picture !== newUserData?.profile_picture) {
        if (prevProfilePicture?.includes(wallet)) await deleteObject(ref(storage, 'profilePictures/' + getCurrentImagePath(prevProfilePicture, wallet)));
        if (profilePicturePreview && !newUserData?.profile_picture?.includes(`0x${'0'.repeat(30)}`)) {
          await uploadBytes(ref(storage, `profilePictures/${wallet}${profilePictureFileType}`), profilePictureFile).then((snapshot) =>
            getDownloadURL(snapshot.ref).then((url) => (updatedUserData.profile_picture = url)),
          );
        }
      }
      if (currentUserData?.banner !== newUserData?.banner) {
        if (prevBanner?.includes(wallet)) await deleteObject(ref(storage, 'banners/' + getCurrentImagePath(prevBanner, wallet)));
        if (bannerPreview && !newUserData?.banner?.includes(`0x${'0'.repeat(30)}`)) {
          await uploadBytes(ref(storage, `banners/${wallet}${bannerFileType}`), bannerFile).then((snapshot) =>
            getDownloadURL(snapshot.ref).then((url) => (updatedUserData.banner = url)),
          );
        }
      }
      const { data } = await updateUserSettings(id, updatedUserData);
      await dispatch.userModel.getUser(data.wallet);
      dispatch.authModel.setUser(data);
      this.setIsLoading(false);
      dispatch.settingsModel.clearState();
    },
    async handleProfilePictureUpload(e: React.ChangeEvent<HTMLInputElement>) {
      const input = e.target as HTMLInputElement;
      if (input?.files) {
        const { type: fileType, size: fileSize } = input.files[0];
        if (fileType !== 'image/png' && fileType !== 'image/jpg' && fileType !== 'image/jpeg') {
          this.setProfilePictureError('invalid file type');
          setTimeout(() => this.setProfilePictureError(''), 3000);
        } else if (fileSize > 10000000) {
          this.setProfilePictureError('max file size exceeded');
          setTimeout(() => this.setProfilePictureError(''), 3000);
        } else {
          this.setProfilePicture(URL.createObjectURL(input.files[0]));
          this.setProfilePictureFileType('.' + fileType.split('/')[1]);
          this.setProfilePicturePreview(URL.createObjectURL(input.files[0]));
          this.setProfilePictureFile(input.files[0]);
          this.setProfilePictureError('');
        }
      }
    },
    async handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
      const input = e.target as HTMLInputElement;
      if (input?.files) {
        const { type: fileType, size: fileSize } = input.files[0];
        if (fileType !== 'image/png' && fileType !== 'image/jpg' && fileType !== 'image/jpeg') {
          this.setBannerError('incompatible file type.');
          setTimeout(() => this.setBannerError(''), 3000);
        } else if (fileSize > 10000000) {
          this.setBannerError('max file size exceeded');
          setTimeout(() => this.setBannerError(''), 3000);
        } else {
          this.setBanner(URL.createObjectURL(input.files[0]));
          this.setBannerFileType('.' + fileType.split('/')[1]);
          this.setBannerPreview(URL.createObjectURL(input.files[0]));
          this.setBannerFile(input.files[0]);
          this.setBannerError('');
        }
      }
    },
    async handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      const input = e.target as HTMLTextAreaElement;
      if (!regex.test(input.value)) {
        this.setDescriptionError('enter only letters, numbers, and spaces');
        setTimeout(() => this.setDescriptionError(''), 3000);
      } else if (input.value.length > 130) {
        this.setDescriptionError('max characters exceeded');
        setTimeout(() => this.setDescriptionError(''), 3000);
      } else {
        this.setDescriptionError('');
        this.setDescription(input.value);
        this.setDescCharacters(input.value.length);
      }
    },
  }),
});
