import { animated, useInView } from 'react-spring';

interface OwnProps {
  text: string;
}

export const FadeOutDown = ({ text }: OwnProps) => {
  const [ref, props] = useInView(() => ({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  }));

  return (
    <animated.p ref={ref} style={props}>
      {text}
    </animated.p>
  );
};
