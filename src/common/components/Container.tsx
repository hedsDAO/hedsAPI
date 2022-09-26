import React from 'react';
import { ReactChildrenAsProps } from '@/models/common';

export const Container = ({ children }: ReactChildrenAsProps) => {
  return <div className="max-w-7xl my-10 mx-auto px-3 flex flex-row gap-8">{children}</div>;
};
