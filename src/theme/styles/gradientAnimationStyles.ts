const gradientAnimationStyle = {
  '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
  '.gradient': {
    background: 'linear-gradient(-45deg, #ee6652d2, #e6673c7e, #2366a6d5, #2366d5ab)',
    backgroundSize: '500% 500%',
    animation: 'gradient 10s ease infinite',
  },
};

export default gradientAnimationStyle;
