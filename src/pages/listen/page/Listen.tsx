import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { HedsTape } from '@/pages/listen/screens/hedstape/HedsTape/HedsTape';
import { CollabTape } from '../screens/collabtape/CollabTape/CollabTape';

export const Listen = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<Dispatch>();
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();

  const currentTape = useSelector(store.select.tapesModel.selectCurrentTape);
  console.log(currentTape)
  const allTapes = useSelector(store.select.tapesModel.selectAllTapes);

  useEffect(() => {
    if (allTapes && allTapes?.[tape]?.[id] && allTapes?.[tape]?.[id]?.tracks) dispatch.tapesModel.getTapeArtists([allTapes?.[tape]?.[id]]);
    if (pathname !== currentTape?.route) dispatch.tapesModel.getTapeArtists([allTapes?.[tape]?.[id]]);
  }, [allTapes, pathname, space, tape, id]);

  return (
    <div className="">
      {tape === 'hedstape' && pathname === currentTape?.route && <HedsTape />}
      {tape === 'collabtape' && pathname === currentTape?.route && <CollabTape />}
    </div>
  );
};
