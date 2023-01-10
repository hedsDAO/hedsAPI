import { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import { Center } from '@chakra-ui/react';

interface OwnProps {
  inputNum: number;
  dollar?: boolean;
  color?: string;
  size?: string;
}

export const Number = ({ inputNum, dollar, color = 'white', size = '8rem' }: OwnProps) => {
  const [inView, setInView] = useState(false);

  const { number } = useSpring({
    number: inputNum,
    immediate: false,
    from: { number: 0 },
    config: config.molasses,
    delay: 500,
    cancel: !inView,
  });

  return (
    <Waypoint onEnter={() => setInView(true)}>
      <Center fontSize={size} fontWeight="bold" color={color}>
        {dollar && <p>$</p>}
        <animated.p>{number.to((num) => Math.round(num))}</animated.p>
      </Center>
    </Waypoint>
  );
};
