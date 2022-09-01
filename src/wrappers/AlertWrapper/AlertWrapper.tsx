import React, { Fragment, useEffect } from 'react';
// import { Dispatch, RootState } from 'src/store';
// import { useDispatch, useSelector } from 'react-redux';
// import Warning from '../../../src/common/Alerts/Warning';
// import { Alerts } from '../../../src/models/common';

export const AlertWrapper = ({ children }: { children: JSX.Element }) => {
  // const dispatch = useDispatch<Dispatch>();
  // const alertData = useSelector((state: RootState) => state.alertModel);

  // useEffect(() => {
  //   dispatch.alertModel.setAlert(Alerts.NETWORK_CHANGE);
  //   dispatch.alertModel.setIsOpen(true);
  //   const timer = setTimeout(() => dispatch.alertModel.setIsOpen(false), 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <Fragment>
      {/* {alertData.currentAlert === Alerts.NETWORK_CHANGE && alertData.isOpen && <Warning />} */}
      {children}
    </Fragment>
  );
};
