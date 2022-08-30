import React from 'react';
import { Landing } from '@pages/Landing/Landing';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

describe('Landing Unit', () => {
  test('should render component properly', () => {
    // const props = {
    //   wallet: "0xd2d22571b06df7a36f24fd84e528fd1bb12ff5cb",
    // };
    render(<Landing />);
    expect(screen.getByText('test me')).toBeInTheDocument();
    // const render = renderer.create(<Landing wallet={props.wallet} />);
    // const tree = render.toJSON();
    // console.log(tree);
    // expect(tree).toMatchSnapshot();
  });
});
