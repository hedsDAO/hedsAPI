import axios from 'axios';
import { models, RootModel } from '@/models';
import { settingsModelState } from '@/tests/mocks/models/settingsModelState';
import { init } from '@rematch/core';
import { act, waitFor } from '@testing-library/react';

describe('SettingsModel unit', () => {
  describe('reducers', () => {
    it('should set user data when given payload', async () => {
      const store = init<RootModel>({ models });
      const { userData } = settingsModelState;
      await store.dispatch.settingsModel.setUserData(userData);
      const myModelData = store.getState().settingsModel.userData;
      expect(myModelData).toEqual(userData);
    });
    it('should set profile picture file when given payload', async () => {
      const store = init<RootModel>({ models });
      const { profilePictureFile, profilePictureFileType, profilePicturePreview } = settingsModelState;
      await store.dispatch.settingsModel.setProfilePictureFile(profilePictureFile);
      await store.dispatch.settingsModel.setProfilePicturePreview(profilePicturePreview);
      await store.dispatch.settingsModel.setProfilePictureFileType(profilePictureFileType);
      const myModelData = store.getState().settingsModel;
      expect(myModelData.profilePictureFile).toEqual(settingsModelState.profilePictureFile);
      expect(myModelData.profilePictureFileType).toEqual(settingsModelState.profilePictureFileType);
      expect(myModelData.profilePicturePreview).toEqual(settingsModelState.profilePicturePreview);
    });
    it('should set banner file when given payload', async () => {
      const store = init<RootModel>({ models });
      const { bannerFile, bannerFileType, bannerPreview } = settingsModelState;
      await store.dispatch.settingsModel.setBannerFile(bannerFile);
      await store.dispatch.settingsModel.setBannerPreview(bannerPreview);
      await store.dispatch.settingsModel.setBannerFileType(bannerFileType);
      const myModelData = store.getState().settingsModel;
      expect(myModelData.bannerFile).toEqual(settingsModelState.bannerFile);
      expect(myModelData.bannerFileType).toEqual(settingsModelState.bannerFileType);
      expect(myModelData.bannerPreview).toEqual(settingsModelState.bannerPreview);
    });
    it('should set errors properly when given a payload', async () => {
      const store = init<RootModel>({ models });
      const { profilePictureError, bannerError } = settingsModelState;
      await store.dispatch.settingsModel.setProfilePictureError(profilePictureError);
      await store.dispatch.settingsModel.setBannerError(bannerError);
      const myModelData = store.getState().settingsModel;
      expect(myModelData.bannerError).toEqual(settingsModelState.bannerError);
      expect(myModelData.profilePictureError).toEqual(settingsModelState.profilePictureError);
    });
    it('should clear state when clearState() is called', async () => {
      const store = init<RootModel>({ models });
      await store.dispatch.settingsModel.setUserData(settingsModelState.userData);
      await store.dispatch.settingsModel.clearState();
      const myModelData = store.getState().settingsModel;
      expect(myModelData).toEqual({});
    });
  });
  // TODO: Add tests for effects
  // TODO: Add tests for selectors
});
