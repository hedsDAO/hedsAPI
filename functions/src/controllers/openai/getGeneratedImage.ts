import * as express from 'express';
import * as functions from 'firebase-functions';
import { Configuration, OpenAIApi } from 'openai';
import * as common from '../../common';

export const getGeneratedImage = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  functions.logger.log(res.locals);
  if (res.locals?.subId?.length) {
    const openai: OpenAIApi = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
    const generatedImage = await openai.createImage({
      prompt: common.generatePrompt(res.locals.subId),
      n: 1,
      size: '256x256',
    });
    const imageUrl: string | undefined = generatedImage?.data?.data?.[0]?.url;
    // functions.logger.log(imageUrl);
    if (imageUrl) {
      res.locals.imageUrl = imageUrl;
      return next();
    } else return res.status(400);
  } else return res.status(400);
};
