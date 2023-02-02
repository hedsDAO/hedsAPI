import { animated, useSpring, useScroll } from 'react-spring';
import { Link } from 'react-router-dom';
import hedsLogo from '@/public/heds_logo.svg';

export const LogoTransform = ({ parallaxRef, width }: any) => {
  const [props, api] = useSpring(() => ({ width, transform: 'translateY(0%)' }));
  const { scrollYProgress } = useScroll({
    container: parallaxRef.current.container,
    onChange: ({ value: { scrollYProgress } }) => {
      if (scrollYProgress > 0.005) {
        api.start({ transform: 'translateY(0%)', width: '100px' });
      } else {
        api.start({ transform: 'translateY(50%)', width });
      }
    },
  });
  return (
    <Link to="/explore" style={{ display: 'flex', alignItems: 'start', justifyContent: 'center' }}>
      <animated.img style={props} src={hedsLogo} />
    </Link>
  );
};
