import { createModel } from '@rematch/core';
import { RootModel } from '@/models';
import { verifyDisplayName } from '@/api/auth';
import { updateUser } from '@/api/user';

export const connectModel = createModel<RootModel>()({
  state: {
    displayName: '',
    isLoading: false,
    error: '',
  },
  reducers: {
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setDisplayName: (state, displayName: string) => ({ ...state, displayName }),
    setError: (state, error: string) => ({ ...state, error }),
    clearState: (state) => ({ displayName: '', isLoading: false, error: '' }),
  },
  selectors: (slice) => ({
    selectState: () => slice((state) => state),
    selectDisplayName: () => slice((state) => state.displayName),
    selectIsLoading: () => slice((state) => state.isLoading),
    selectError: () => slice((state) => state.error),
    selectIsDisplayNameValid: () => slice((state) => state.displayName.length > 3 && state.displayName.length < 15),
  }),

  effects: (dispatch) => ({
    async validateDisplayName([displayName, userId, wallet]: [string, number, string]) {
      this.setIsLoading(true);
      try {
        const res = await verifyDisplayName(displayName);
        if (res.data?.validated) {
          console.log('this name is taken');
          this.setError('This name is already taken');
          this.setIsLoading(false);
          setTimeout(() => this.setError(''), 3000);
        }
      } catch (e) {
        if (e.response.data?.validated === false) {
          console.log('this name is available');
          await updateUser(userId, { display_name: displayName });
          dispatch.authModel.getUser(wallet);
          this.setIsLoading(false);
          dispatch.modalModel.setModal(null);
        }
      }
    },
  }),
});
