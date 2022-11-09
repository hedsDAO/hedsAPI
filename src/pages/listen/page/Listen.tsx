import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { isEmpty } from '@/utils';
import { HedsTape } from '@/pages/listen/screens/HedsTape/HedsTape';

export const Listen = () => {
  const dispatch = useDispatch<Dispatch>();
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const { hedsTapes } = useSelector((state: RootState) => state.tapesModel);
  const { artistMapping } = useSelector((state: RootState) => state.artistModel);

  useEffect(() => {
    if (!isEmpty(hedsTapes) && tape && id && !isEmpty(artistMapping)) {
      dispatch.tapesModel.getHedsTapeArtists([hedsTapes?.[id], artistMapping]);
      dispatch.hedstapeModel.getTapeTimeline(hedsTapes?.[id]);
      dispatch.tapesModel.setSpaceTapeId([space, tape, id]);
    }
  }, [hedsTapes, space, tape, id]);

  return <div className="">{tape === 'hedstape' && <HedsTape />}</div>;
};
