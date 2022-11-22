import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState, store } from '@/store';
import { isEmpty } from '@/utils';
import { HedsTape } from '@/pages/listen/screens/hedstape/HedsTape/HedsTape';
import { CollabTape } from '../screens/collabtape/CollabTape/CollabTape';

export const Listen = () => {
  const dispatch = useDispatch<Dispatch>();
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const { hedsTapes, collabTapes } = useSelector((state: RootState) => state.tapesModel);
  const { artistMapping } = useSelector((state: RootState) => state.artistModel);
  const currentTape = useSelector(store.select.tapesModel.selectCurrentTape);
  const currentCollabTape = useSelector(store.select.tapesModel.selectCurrentCollabTape);
  useEffect(() => {
    dispatch.tapesModel.setSpaceTapeId([space, tape, id]);
    if (tape === 'hedstape' && id && !isEmpty(hedsTapes)) {
      dispatch.tapesModel.getHedsTapeArtists([hedsTapes?.[id], artistMapping]);
      dispatch.hedstapeModel.getTapeTimeline(hedsTapes?.[id]);
    }
    if (tape === 'collabtape' && id && !isEmpty(collabTapes)) {
      dispatch.tapesModel.setCurrentCollabTape(collabTapes[id]);
      dispatch.collabModel.getTapeTimeline(collabTapes[id]);
    }
  }, [hedsTapes, collabTapes, space, tape, id]);

  return (
    <div className="">
      {tape === 'hedstape' && currentTape && <HedsTape />}
      {tape === 'collabtape' && currentCollabTape && <CollabTape />}
    </div>
  );
};
