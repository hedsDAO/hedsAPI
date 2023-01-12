import { animated, useScroll } from '@react-spring/web';

//TODO: specify argument type away from any
export const LogoTransform = ({ parallaxRef }: any) => {
  const { scrollYProgress } = useScroll({
    container: parallaxRef.current.container,
  });

  return (
    <animated.img
      src="/heds_logo.svg"
      style={{
        width: scrollYProgress.to((scrollP) => {
          return window.innerWidth / 2 - scrollP * 15000;
        }),
      }}
    />
  );
};
