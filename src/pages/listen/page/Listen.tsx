import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState, store } from '@/store';
import { HedsTape } from '@/pages/listen/screens/hedstape/HedsTape/HedsTape';
import { CollabTape } from '../screens/collabtape/CollabTape/CollabTape';
import { isEmpty } from '@/utils';

export const Listen = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<Dispatch>();
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const { artistMapping } = useSelector((state: RootState) => state.artistModel);
  const currentTape = useSelector(store.select.tapesModel.selectCurrentTape);
  const allTapes = useSelector(store.select.tapesModel.selectAllTapes);

  useEffect(() => {
    dispatch.tapesModel.setSpaceTapeId([space, tape, id]);
    if (allTapes && allTapes?.[tape]?.[id] && !isEmpty(artistMapping)) {
      dispatch.tapesModel.getTapeArtists([allTapes?.[tape]?.[id], artistMapping]);
    }
    if (pathname !== currentTape?.route) {
      dispatch.tapesModel.getTapeArtists([allTapes?.[tape]?.[id], artistMapping]);
    }
  }, [allTapes, artistMapping, pathname, space, tape, id]);

  return (
    <div className="">
      {tape === 'hedstape' && pathname === currentTape?.route && <HedsTape />}
      {tape === 'collabtape' && pathname === currentTape?.route && <CollabTape />}
    </div>
  );
};
