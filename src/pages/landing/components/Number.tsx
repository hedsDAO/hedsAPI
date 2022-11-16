import { useSpring, animated, config } from 'react-spring';

interface OwnProps {
  inputNum: number;
}

export const Number = ({ inputNum }: OwnProps) => {
  const { number } = useSpring({
    number: inputNum,
    from: { number: 0 },
    config: { ...config.molasses },
    duration: 200,
  });
  return <animated.p style={{ fontSize: '12em', fontWeight: 'bold', color: 'white' }}>{number.to((num) => Math.round(num))}</animated.p>;
};
