import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';

export interface PaginationModelState {
  currentPage: number;
  itemsPerPage: number;
}

export const paginationModel = createModel<RootModel>()({
  state: {} as PaginationModelState,
  reducers: {
    setState: (state, payload: PaginationModelState) => ({ ...state, ...payload }),
    setCurrentPage: (state, currentPage) => ({ ...state, currentPage }),
    setItemsPerPage: (state, itemsPerPage) => ({ ...state, itemsPerPage }),
  },
  selectors: (slice) => ({
    selectCurrentPage() {
      return slice((state): number => state.currentPage);
    },
    selectItemsPerPage() {
      return slice((state) => state.itemsPerPage);
    },
  }),
  effects: () => ({}),
});
