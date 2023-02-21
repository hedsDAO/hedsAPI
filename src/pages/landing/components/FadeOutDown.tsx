import { animated, useInView, useSpringRef } from 'react-spring';

interface OwnProps {
  text: string;
}

export const FadeOutDown = ({ text }: OwnProps) => {
  const [ref, props] = useInView(
    () => ({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      config: {
        tension: 25,
      },
    }),
    { rootMargin: '-35% 0px -10% 0px' },
  );

  return (
    <animated.p ref={ref} style={props}>
      {text}
    </animated.p>
  );
};
