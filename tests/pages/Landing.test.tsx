import React from 'react';
import { Landing } from '@pages/Explore/Explore';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

describe('Landing Unit', () => {
  test('should render component properly', () => {
    const render = renderer.create(<Landing />);
    const tree = render.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
