import { screen } from '@testing-library/react';
import { store } from '@/store';
import { tapeData } from '@/tests/mocks/TapeData';
import { renderWithRematchStore } from '@/tests/utils/testUtils';
import { TapeAndCurator } from '@modals/screens/sample/components';
import { Modals } from '@/modules/modals/store/modalModel';

describe('TapeAndCurator Unit', () => {
  beforeEach(() => renderWithRematchStore(<TapeAndCurator />, store));
  beforeAll(() => {
    store.dispatch.modalModel.setModal(Modals.SAMPLE_MODAL);
    store.dispatch.modalModel.setModalOpen(true);
    store.dispatch.tapesModel.setCurrentTape(tapeData);
  });
  it('renders properly', () => {
    const tapeAndCuratorContainer = screen.getAllByTestId('sample-tape-curator');
    expect(tapeAndCuratorContainer).toBeTruthy();
  });
  it('renders tape and curator names', async () => {
    const tapeCurator = await screen.findByText(tapeData.curator.displayName);
    const tapeName = await screen.findByText(tapeData.name);
    expect(tapeCurator).toBeTruthy();
    expect(tapeName).toBeTruthy();
  });
});
