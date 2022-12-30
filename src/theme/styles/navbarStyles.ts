const navbarStyles = {
  '.navbar-parent': {
    fontSize: '0.9rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 500,
    '*': {
      boxSizing: 'border-box',
    },
    li: {
      display: 'inline-block',
      listStyle: 'outside none none',
      margin: '0 0.9em',
      padding: 0,
    },
    a: {
      padding: '0.4em 0',
      position: 'relative',
      letterSpacing: '1.5px',
      textDecoration: 'none',
    },
  },
  '.navbar-mobile-link': {
    marginLeft: '0.25rem',
    marginRight: '0.25rem',
    display: 'block',
    paddingLeft: '0.75rem',
    paddingRight: '1rem',
    fontWeight: 500,
    '&:hover': {
      borderColor: 'rgb(209 213 219)',
      background: 'rgb(243 244 246)',
      color: 'rgb(31 41 55)',
    },
    borderColor: 'transparent',
  },
};

export default navbarStyles;
