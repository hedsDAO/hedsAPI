import * as express from "express";

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
