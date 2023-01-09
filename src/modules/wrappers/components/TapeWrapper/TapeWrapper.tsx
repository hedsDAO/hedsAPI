import { Fragment, useEffect } from 'react';
import { Dispatch, store } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const TapeWrapper = ({ children }: { children: JSX.Element }) => {
  const { pathname } = useLocation();
  const spaceTapeId = useSelector(store.select.tapesModel.selectSpaceTapeId);
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    if (pathname.includes('/listen') || pathname?.includes('/vote')) {
      const [route, space, tape, id] = pathname.split('/').slice(1);
      if (space && tape && id) {
        if (JSON.stringify([space, tape, id]) !== JSON.stringify(spaceTapeId)) dispatch.tapesModel.setSpaceTapeId([space, tape, id]);
      }
    }
    dispatch.tapesModel.getAllTapes();
    dispatch.artistModel.getAllArtists();
  }, []);

  useEffect(() => {
    if (pathname.includes('/listen') || pathname?.includes('/vote')) {
      const [route, space, tape, id] = pathname.split('/').slice(1);
      if (space && tape && id) {
        if (JSON.stringify([space, tape, id]) !== JSON.stringify(spaceTapeId)) dispatch.tapesModel.setSpaceTapeId([space, tape, id]);
      }
    }
  }, [pathname]);

  return <Fragment>{children}</Fragment>;
};

export default TapeWrapper;
