Object.defineProperty(window, 'location', {
  writable: true,
  value: { pathname: '/', assign: jest.fn() },
});

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});
