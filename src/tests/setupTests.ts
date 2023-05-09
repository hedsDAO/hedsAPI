import '@testing-library/jest-dom';
import 'resize-observer-polyfill';

// Add the following code to mock the ResizeObserver
const ResizeObserverMock = jest.fn((callback) => ({
  observe: jest.fn((element) => callback([{ contentRect: { width: 200, height: 100 } }])),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

window.ResizeObserver = ResizeObserverMock;