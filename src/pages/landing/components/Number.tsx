import { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Waypoint } from 'react-waypoint';

interface OwnProps {
  inputNum: number;
}

export const Number = ({ inputNum }: OwnProps) => {
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
      <div className="flex justify-center w-2/4">
        <animated.p style={{ fontSize: '8em', fontWeight: 'bold', color: 'white' }}>{number.to((num) => Math.round(num))}</animated.p>
      </div>
    </Waypoint>
  );
};
