import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Waypoint } from 'react-waypoint';

interface OwnProps {
  text: string;
}

export const FadeOutDown = ({ text }: OwnProps) => {
  const [inView, setInView] = useState<boolean>(true);
  const props = useSpring({ from: { opacity: 1 }, to: { opacity: 0 }, delay: 500, reset: true, reverse: inView, onRest: () => setInView(!inView) });
  return (
    // <Waypoint onLeave={() => setInView(!inView)}>
    <animated.p style={props}>{text}</animated.p>
    // </Waypoint>
  );
};
