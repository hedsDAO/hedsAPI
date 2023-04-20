const gradientAnimations = {
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
  '@-moz-keyframes gradient': {
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
  '@-webkit-keyframes gradient': {
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
  '.gradient-bg': {
    background: 'linear-gradient(-45deg, #ee6652d2, #e6673c7e, #2366a6d5, #2366d5ab)',
    backgroundSize: '500% 500%',
    animation: 'gradient 10s ease infinite',
  },
  '.gradient-text': {
    background: 'linear-gradient(90deg, #ee6652, #e6673c, #2366a6, #2366d5)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
  },
};

export default gradientAnimations;
