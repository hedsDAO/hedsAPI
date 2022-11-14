import { screen } from '@testing-library/react';
import { store } from '@/store';
import { tapeData } from '@/tests/mocks/TapeData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { Disclaimer } from '@modals/screens/sample/components';
import { Modals } from '@/modules/modals/store/modalModel';

describe('Disclaimer Unit', () => {
  beforeEach(() => renderWithRematchStore(<Disclaimer />, store));
  beforeAll(() => {
    store.dispatch.modalModel.setModal(Modals.SAMPLE_MODAL);
    store.dispatch.modalModel.setModalOpen(true);
    store.dispatch.tapesModel.setCurrentTape(tapeData);
  });
  it('renders properly', () => {
    const tapeAndCuratorContainer = screen.getAllByTestId('sample-disclaimer');
    expect(tapeAndCuratorContainer).toBeTruthy();
  });

  // TODO: create tests/mock-data for sample/vote/mint
});
