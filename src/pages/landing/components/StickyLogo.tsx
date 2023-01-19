import { animated, useSpring, useScroll } from 'react-spring';

export const StickyLogo = ({ parallaxRef }: any) => {
  const [props, api] = useSpring(() => ({ width: '600px', transform: 'translateY(0%)' }));
  const { scrollYProgress } = useScroll({
    container: parallaxRef.current.container,
    onChange: ({ value: { scrollYProgress } }) => {
      if (scrollYProgress > 0.005) {
        api.start({ transform: 'translateY(0%)', width: '100px' });
      } else {
        api.start({ transform: 'translateY(50%)' });
      }
    },
  });
  return <animated.img style={props} src="/heds_logo.svg" />;
};
