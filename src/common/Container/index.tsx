import React from 'react';
import { Container } from './Container';
import { ReactChildrenAsProps } from '@/models/common';
export default ({ children }: ReactChildrenAsProps): JSX.Element => <Container>{children}</Container>;
