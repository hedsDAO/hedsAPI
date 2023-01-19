import { animated, useScroll, useSpring } from '@react-spring/web';

export const LogoTransform = ({ parallaxRef }: any) => {
  const { scrollYProgress } = useScroll({
    container: parallaxRef.current.container,
  });

  return (
    <animated.img
      src="/heds_logo.svg"
      style={{
        width: scrollYProgress.to((scrollP) => {
          const calc = 1 - scrollP / 0.065;
          console.log(calc, scrollP);

          // return scrollP >= 0.05 ? '100px' : `${window.innerWidth - scrollP * 10 * window.innerWidth}px`;
          const result = window.innerWidth * calc;
          console.log(result);
          return `${result < 100 ? 100 : result}px`;
          // return `${window.innerWidth - scrollP * 10 * window.innerWidth}px`;
        }),
      }}
    />
  );
};
