import React, { Fragment } from 'react';
import { Dispatch } from 'src/store';
import { useDispatch } from 'react-redux';

export const AlertWrapper = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch<Dispatch>();

  return <Fragment>{children}</Fragment>;
};
