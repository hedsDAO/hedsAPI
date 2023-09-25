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

export const newUserObject = {
    profile_picture: "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/profilePictures%2F0x000000000000000000000000000000.png?alt=media&token=55cb53fe-736d-4b1e-bcd0-bf17bc7146dc",
    banner: "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3",
    role: "user",
    joined: Date.now(),
};
