import React from 'react';
import { PaginationBar } from './PaginationBar';
export default ({total, perPage}: {total: number; perPage: number}): JSX.Element => <PaginationBar total={total} perPage={perPage} />;
