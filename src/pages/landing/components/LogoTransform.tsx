import { animated, useSpring, useScroll } from 'react-spring';
import { Link } from 'react-router-dom';

export const LogoTransform = ({ parallaxRef }: any) => {
  const [props, api] = useSpring(() => ({ width: '600px', transform: 'translateY(0%)' }));
  const { scrollYProgress } = useScroll({
    container: parallaxRef.current.container,
    onChange: ({ value: { scrollYProgress } }) => {
      if (scrollYProgress > 0.005) {
        api.start({ transform: 'translateY(0%)', width: '100px' });
      } else {
        api.start({ transform: 'translateY(50%)', width: '600px' });
      }
    },
  });
  return (
    <Link to="/explore">
      <animated.img style={props} src="/heds_logo.svg" />
    </Link>
  );
};
