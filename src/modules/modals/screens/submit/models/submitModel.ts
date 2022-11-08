import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';

class SubmitModalState {
  numberOfSteps: number;
  currentStep: number;
  isRequirementsChecked: boolean;
  isDisclaimerChecked: boolean;
}

export const submitModel = createModel<RootModel>()({
  state: {
    isRequirementsChecked: false,
    isDisclaimerChecked: false,
    numberOfSteps: 3,
    currentStep: 1,
  } as SubmitModalState,
  reducers: {
    setCurrentStep: (state, currentStep) => ({ ...state, currentStep }),
    setIsRequirementsChecked: (state, isRequirementsChecked: boolean) => ({ ...state, isRequirementsChecked }),
  },
  effects: () => ({}),
});
