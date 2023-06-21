import * as express from 'express';

// custom request body type
export interface TypedRequestBody<T> extends express.Request {
  body: T;
}

// pinata metadata options
export interface Options {
  sourceUrl: string;
  pinataMetadata: {
    name: string;
    keyvalues: {
      id: string;
      space: string;
      tape: string;
    };
  };
}

// opeasea parsed, listing type

// creates prompt for openai
export const generatePrompt = (string: string) => `a pixel art album cover of a small ${string} in the center with a white background`;

// pinata url prefix
export const ipfsPrefix = 'https://www.heds.cloud/ipfs/';
