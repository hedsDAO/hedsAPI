import type { RootModel } from '@/models';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateUser } from '@/api/user';
import { storage } from '@/App';
import { SettingsModelState } from '@/modals/screens/settings/models/common';
import { regex } from '@/modals/screens/settings/models/constants';
import { User } from '@/models/common';
import { getCurrentImagePath } from '@/utils';
import { createModel } from '@rematch/core';
import { verifyTweet } from '@/api/auth';

export const settingsModel = createModel<RootModel>()({
  state: {} as SettingsModelState,
  reducers: {
    setDescription: (state, description: string) => ({ ...state, userData: { ...state.userData, description } }),
    setDescCharacters: (state, descCharacters: number) => ({ ...state, descCharacters }),
    setDescriptionError: (state, descriptionError: string) => ({ ...state, descriptionError }),
    setTwitterHandle: (state, twitterHandle: string) => ({ ...state, userData: { ...state.userData, twitter_handle: twitterHandle } }),
    setTwitterHandleCharacters: (state, twitterHandleCharacters: number) => ({ ...state, twitterHandleCharacters }),
    setTwitterHandleError: (state, twitterHandleError: string) => ({ ...state, twitterHandleError }),
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
    clearState: (_) => ({} as SettingsModelState),
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
    selectTwitterHandle: () => slice((state) => state.userData?.twitter_handle),
    selectTwitterHandleCharacters: () => slice((state) => state.twitterHandleCharacters),
    selectTwitterHandleError: () => slice((state) => state.twitterHandleError),
    selectProfilePicture: () => slice((state) => state.userData?.profile_picture),
    selectProfilePictureFile: () => slice((state) => state.profilePictureFile),
    selectProfilePictureFileType: () => slice((state) => state.profilePictureFileType),
    selectProfilePicturePreview: () => slice((state) => state.profilePicturePreview),
    selectProfilePictureError: () => slice((state) => state.profilePictureError),
  }),
  effects: (dispatch) => ({
    async handleSubmit([settingsState, currentUserData]: [SettingsModelState, User]) {
      this.setIsLoading(true);
      const { bannerFile, bannerFileType, bannerPreview, profilePictureFile, profilePictureFileType, profilePicturePreview, userData } = settingsState;
      const { profile_picture: prevProfilePicture, banner: prevBanner, wallet, id } = currentUserData;
      const { description, twitter_handle } = { ...userData };

      if (currentUserData?.twitter_handle !== twitter_handle) {
        try {
          if (twitter_handle?.length === 0) await updateUser(id, { twitter_handle: '' });
          else {
            const res = await verifyTweet(twitter_handle);
            if (res.data?.validated) await updateUser(id, { twitter_handle: twitter_handle });
            else {
              this.setIsLoading(false);
              this.setTwitterHandleError('this twitter handle is linked to another account');
              setTimeout(() => this.setTwitterHandleError(''), 3000);
            }
          }
        } catch (error) {
          this.setIsLoading(false);
          this.setTwitterHandleError('this twitter handle is linked to another account');
          setTimeout(() => this.setTwitterHandleError(''), 3000);
          return;
        }
      }
      if (currentUserData?.description !== description) {
        await updateUser(id, { description: description });
      }
      if (profilePictureFile?.size > 0 && profilePictureFileType) {
        if (prevProfilePicture?.includes(wallet)) await deleteObject(ref(storage, 'profilePictures/' + getCurrentImagePath(prevProfilePicture, wallet)));
        try {
          await uploadBytes(ref(storage, `profilePictures/${wallet}${profilePictureFileType}`), profilePictureFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
              await updateUser(id, { profile_picture: url });
            });
          });
        } catch (error) {
          console.log(error, 'error uploading profile picture');
        }
      }
      if (bannerFile?.size > 0 && bannerPreview) {
        if (prevBanner?.includes(wallet)) await deleteObject(ref(storage, 'banners/' + getCurrentImagePath(prevBanner, wallet)));
        try {
          await uploadBytes(ref(storage, `banners/${wallet}${bannerFileType}`), bannerFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
              await updateUser(id, { banner: url });
            });
          });
        } catch (error) {
          console.log(error, 'error uploading banner');
        }
      }
      dispatch.userModel.getUser(wallet);
      dispatch.authModel.getUser(wallet);
      this.setIsLoading(false);
      this.clearState();
      return;
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
          console.log('fileType', fileType);
          this.setBanner(URL.createObjectURL(input.files[0]));
          this.setBannerFileType('.' + fileType.split('/')[1]);
          this.setBannerPreview(URL.createObjectURL(input.files[0]));
          this.setBannerFile(input.files[0]);
          this.setBannerError('');
        }
      }
    },
    async handleDescriptionChange(value: string) {
      if (!regex.test(value)) {
        this.setDescriptionError('enter only letters, numbers, and spaces');
        setTimeout(() => this.setDescriptionError(''), 3000);
      } else if (value.length > 130) {
        this.setDescriptionError('max characters exceeded');
        setTimeout(() => this.setDescriptionError(''), 3000);
      } else {
        this.setDescriptionError('');
        this.setDescription(value);
        this.setDescCharacters(value.length);
      }
    },
  }),
});
