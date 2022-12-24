import { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Waypoint } from 'react-waypoint';

export const HedsLogo = () => {
  const [inView, setInView] = useState(false);

  return (
    <Waypoint>
      <img src="/hedslogo.png" />
    </Waypoint>
  );
};
