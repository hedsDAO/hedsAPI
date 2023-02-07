import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@/App';
import { getCurrentImagePath } from '@/utils';
import { SettingsModalState } from './common';
import { User } from '@/models/common';

export const settingsModel = createModel<RootModel>()({
  state: {} as SettingsModalState,
  reducers: {
    setProfileModelData: (state, profileChanges: User) => ({ ...state, profileChanges }),
    setDescription: (state, description: string) => ({ ...state, profileChanges: { ...state.profileChanges, description } }),
    setDisplayName: (state, displayName: string) => ({ ...state, profileChanges: { ...state.profileChanges, displayName } }),
    setProfilePicture: (state, profilePicture: string) => ({ ...state, profileChanges: { ...state.profileChanges, profilePicture } }),
    setBanner: (state, banner: string) => ({ ...state, profileChanges: { ...state.profileChanges, banner } }),
    setDescCharacters: (state, descCharacters: number) => ({ ...state, descCharacters }),
    setNameCharacters: (state, nameCharacters: number) => ({ ...state, nameCharacters }),
    setBannerFile: (state, bannerFile: File) => ({ ...state, bannerFile }),
    setBannerFileType: (state, bannerFileType: string) => ({ ...state, bannerFileType }),
    setBannerPreview: (state, bannerPreview) => ({ ...state, bannerPreview }),
    setProfilePictureFile: (state, profilePictureFile: File) => ({ ...state, profilePictureFile }),
    setProfilePictureFileType: (state, profilePictureFileType: string) => ({ ...state, profilePictureFileType }),
    setProfilePicturePreview: (state, profilePicturePreview) => ({ ...state, profilePicturePreview }),
    setError: (state, error: string) => ({ ...state, error }),
    setIsLoading: (state, loading: boolean) => ({ ...state, loading }),
    clearProfileModalState: (state) => new SettingsModalState(),
  },
  effects: (dispatch) => ({
    async handleSubmit([prevProfileData, profileModalState]: [User, SettingsModalState]) {
      this.setIsLoading(true);
      this.setError('');
      const { bannerFile, bannerFileType, bannerPreview, profilePictureFile, profilePictureFileType, profilePicturePreview } = profileModalState;
      const newProfileData = { ...profileModalState.profileChanges };
      const { profilePicture: prevProfilePicture, banner: prevBanner, wallet } = prevProfileData;
      if (prevProfileData?.profilePicture !== newProfileData?.profilePicture) {
        if (prevProfilePicture?.includes(wallet)) await deleteObject(ref(storage, 'profilePictures/' + getCurrentImagePath(prevProfilePicture, wallet)));
        if (profilePicturePreview && !newProfileData?.profilePicture?.includes(`0x${'0'.repeat(30)}`)) {
          await uploadBytes(ref(storage, `profilePictures/${wallet}${profilePictureFileType}`), profilePictureFile).then((snapshot) =>
            getDownloadURL(snapshot.ref).then((url) => (newProfileData.profilePicture = url)),
          );
        }
      }
      if (prevProfileData?.banner !== newProfileData?.banner) {
        if (prevBanner?.includes(wallet)) await deleteObject(ref(storage, 'banners/' + getCurrentImagePath(prevBanner, wallet)));
        if (bannerPreview && !newProfileData?.banner?.includes(`0x${'0'.repeat(30)}`)) {
          await uploadBytes(ref(storage, `banners/${wallet}${bannerFileType}`), bannerFile).then((snapshot) =>
            getDownloadURL(snapshot.ref).then((url) => (newProfileData.banner = url)),
          );
        }
      }
      await dispatch.userModel.updateConnectedUserData([prevProfileData?.wallet, newProfileData]);
      this.setIsLoading(false);
      dispatch.modalModel.setModalOpen(false);
    },
    async handleProfilePictureUpload(e: React.ChangeEvent<HTMLInputElement>) {
      const input = e.target as HTMLInputElement;
      if (input?.files) {
        const { type: fileType, size: fileSize } = input.files[0];
        if (fileType !== 'image/png' && fileType !== 'image/jpg' && fileType !== 'image/jpeg') this.setError('incompatible file type.');
        else if (fileSize > 10000000) this.setError('max file size exceeded');
        else {
          this.setProfilePicture(URL.createObjectURL(input.files[0]));
          this.setProfilePictureFileType('.' + fileType.split('/')[1]);
          this.setProfilePicturePreview(URL.createObjectURL(input.files[0]));
          this.setProfilePictureFile(input.files[0]);
          this.setError('');
        }
      }
    },
    async deleteProfilePicture([profilePicture, profilePicturePreview]: [string, string]) {
      if (profilePicture) {
        const defaultImageRef = ref(storage, 'profilePictures/' + getCurrentImagePath('.png', `0x${'0'.repeat(30)}`));
        const defaultImageUrl = await getDownloadURL(defaultImageRef);
        this.setProfilePicturePreview(defaultImageUrl);
        this.setProfilePicture(defaultImageUrl);
      }
      if (profilePicturePreview) {
        this.setProfilePicturePreview(null);
        this.setProfilePictureFile(null);
        this.setProfilePictureFileType(null);
      }
    },
    async handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
      const input = e.target as HTMLInputElement;
      if (input?.files) {
        const { type: fileType, size: fileSize } = input.files[0];
        if (fileType !== 'image/png' && fileType !== 'image/jpg' && fileType !== 'image/jpeg') this.setError('incompatible file type.');
        else if (fileSize > 100000000) this.setError('max file size exceeded');
        else {
          this.setBanner(URL.createObjectURL(input.files[0]));
          this.setBannerFileType('.' + fileType.split('/')[1]);
          this.setBannerPreview(URL.createObjectURL(input.files[0]));
          this.setBannerFile(input.files[0]);
          this.setError('');
        }
      }
    },
    async deleteBanner([banner, bannerPreview]: [string, string]) {
      if (banner) {
        const defaultImageRef = ref(storage, 'banners/' + getCurrentImagePath('.png', `0x${'0'.repeat(30)}`));
        const defaultImageUrl = await getDownloadURL(defaultImageRef);
        this.setBanner(defaultImageUrl);
        this.setBannerPreview(defaultImageUrl);
      }
      if (bannerPreview) {
        this.setBannerPreview(null);
        this.setBannerFile(null);
        this.setBannerFileType(null);
      }
    },
    async handleDisplayNameInput([e, userData]: [React.ChangeEvent<HTMLInputElement>, User]) {
      this.setError(null);
      if (!e.target.value?.length) {
        this.setDisplayName(userData?.displayName);
        this.setNameCharacters(null);
      } else {
        this.setNameCharacters(e.target.value.trim()?.length);
        this.setDisplayName(e.target.value.trim());
      }
    },
  }),
});
