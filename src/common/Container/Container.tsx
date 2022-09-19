import React from 'react';

export const Container = ({ children }: { children: any }) => {
  return <div className="max-w-7xl my-10 mx-auto px-3 flex flex-row gap-8">{children}</div>;
};
