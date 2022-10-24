import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { isEmpty } from '@/utils';
import { HedsTape } from '@/pages/listen/pages/HedsTape';

export const Listen = () => {
  const dispatch = useDispatch<Dispatch>();

  const { tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const { hedsTapes, currentTape } = useSelector((state: RootState) => state.tapesModel);
  const { artistMapping } = useSelector((state: RootState) => state.artistModel);

  useEffect(() => {
    if (!isEmpty(hedsTapes) && tape && id && !isEmpty(artistMapping)) {
      dispatch.tapesModel.getHedsTapeArtists([hedsTapes?.[id], artistMapping]);
    }
  }, [hedsTapes, tape, id]);

  return <div className="bg-[#f5f5f5]">{tape === 'hedstape' && <HedsTape />}</div>;
};
