import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Waypoint } from 'react-waypoint';

interface OwnProps {
  text: string;
}

export const FadeOutDown = ({ text }: OwnProps) => {
  const [inView, setInView] = useState<boolean>(true);
  const [styles, api] = useSpring(() => ({ opacity: 1 }));
  api.start({ opacity: inView ? 1 : 0 });
  // api.stop();
  // console.log(inView);

  const props = useSpring({ from: { opacity: 1 }, to: { opacity: 0 }, reset: true, reverse: inView, onRest: () => setInView(!inView) });
  return (
    // <Waypoint onPositionChange={() => console.log('changed')}>
    <animated.p style={props}>{text}</animated.p>
    // </Waypoint>
  );
};
