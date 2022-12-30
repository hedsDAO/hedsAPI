const underlineHoverAnimationStyles = {
  '.hover-underline-animation': {
    display: 'inline-block',
    position: 'relative',
  },
  '.hover-underline-animation::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    transform: 'scaleX(0)',
    height: '1px',
    bottom: '0',
    left: '0',
    backgroundColor: 'black',
    transformOrigin: 'bottom right',
    transition: 'transform 0.25s ease-out',
  },
  '.hover-underline-animation:hover::after': {
    transform: 'scaleX(1)',
    transformOrigin: 'bottom left',
  },
};

export default underlineHoverAnimationStyles;
