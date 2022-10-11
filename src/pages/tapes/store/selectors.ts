import { createSelector } from 'reselect';
import { RootState } from '@/store';
import { TapeData } from '@models/common';

export const selectAllHedsTapes = (state: RootState): { [key: string]: TapeData } => state.tapesModel.allTapes || {};
const selectAllTapes = createSelector(selectAllHedsTapes, (hedsTapes) => ({ ...hedsTapes }));
