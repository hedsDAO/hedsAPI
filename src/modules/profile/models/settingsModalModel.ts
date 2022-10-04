import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@/App';
import { User } from '@/models/common';
import { getCurrentImagePath } from '@/utils';

class ProfileModalState {
  profileChanges: User;
  loading = false;
  error = '';
  file: File;
  fileType: string;
  characters: number;
  preview: string;
}

export const settingsModalModel = createModel<RootModel>()({
  state: {} as ProfileModalState,
  reducers: {
    setProfileModelData: (state, profileChanges: User) => ({ ...state, profileChanges }),
    setPublic: (state, payload: boolean) => ({ ...state, profileChanges: { ...state.profileChanges, public: payload } }),
    setDescription: (state, description: string) => ({ ...state, profileChanges: { ...state.profileChanges, description } }),
    setDisplayName: (state, displayName: string) => ({ ...state, profileChanges: { ...state.profileChanges, displayName } }),
    setProfileProfilePicture: (state, profilePicture: string) => ({ ...state, profileChanges: { ...state.profileChanges, profilePicture } }),
    setCharacters: (state, characters: number) => ({ ...state, characters }),
    setError: (state, error: string) => ({ ...state, error }),
    setLoading: (state, loading: boolean) => ({ ...state, loading }),
    setFile: (state, file: File) => ({ ...state, file }),
    setFileType: (state, fileType: string) => ({ ...state, fileType }),
    setPreview: (state, preview) => ({ ...state, preview }),
    clearProfileModalState: (state) => new ProfileModalState(),
  },
  effects: (dispatch) => ({
    async handleSubmit([prevProfileData, profileModalState]: [User, ProfileModalState]) {
      this.setLoading(true);
      const { file, fileType, preview } = profileModalState;
      const newProfileData = { ...profileModalState.profileChanges };
      const { profilePicture: prevProfilePicture, wallet } = prevProfileData;
      if (prevProfileData?.profilePicture !== newProfileData?.profilePicture) {
        if (prevProfilePicture?.includes(wallet)) await deleteObject(ref(storage, 'users/' + getCurrentImagePath(prevProfilePicture, wallet)));
        if (preview) {
          await uploadBytes(ref(storage, `users/${wallet}${fileType}`), file).then((snapshot) =>
            getDownloadURL(snapshot.ref).then((url) => (newProfileData.profilePicture = url)),
          );
        }
      }
      await dispatch.userModel.updateUserData([prevProfileData?.wallet, newProfileData]);
      this.setLoading(false);
      dispatch.modalModel.setModalOpen(false);
    },
    async handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
      const input = e.target as HTMLInputElement;
      if (input?.files) {
        const { type: fileType, size: fileSize } = input.files[0];
        if (fileType !== 'image/png' && fileType !== 'image/jpg' && fileType !== 'image/jpeg') this.setError('incompatible file type.');
        else if (fileSize > 10000000) this.setError('max file size exceeded');
        else {
          this.setProfileProfilePicture(URL.createObjectURL(input.files[0]));
          this.setFileType('.' + fileType.split('/')[1]);
          this.setPreview(URL.createObjectURL(input.files[0]));
          this.setFile(input.files[0]);
          this.setError('');
        }
      }
    },
    async deleteProfilePicture([profilePicture, preview]: [string, string]) {
      if (profilePicture) {
        const defaultImageRef = ref(storage, 'users/' + getCurrentImagePath('.png', `0x${'0'.repeat(30)}`));
        const defaultImageUrl = await getDownloadURL(defaultImageRef);
        this.setProfileProfilePicture(defaultImageUrl);
      }
      if (preview) {
        this.setPreview(null);
        this.setFile(null);
        this.setFileType(null);
      }
    },
  }),
});
