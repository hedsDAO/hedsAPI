import React from 'react';
import { Explore } from '@pages/Explore/Explore';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

describe('Explore Unit', () => {
  test('should render component properly', () => {
    const render = renderer.create(<Explore />);
    const tree = render.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
