import React from 'react';
import { User } from '@pages/User/User';
import renderer from 'react-test-renderer';
import { store } from '@/store';
import { renderWithRematchStore } from '../../utils/testUtils';
import { screen } from '@testing-library/react';

describe('Explore Unit', () => {
  test('should render component properly', () => {
    renderWithRematchStore(<User />, store);
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });
});
