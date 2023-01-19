import '@testing-library/jest-dom/extend-expect';
import dotenv from 'dotenv';

// .env file load for all tests
dotenv.config({ path: './.env' });

// polyfill fix
window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});