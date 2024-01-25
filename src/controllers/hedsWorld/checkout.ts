import { CreatePaymentLinkRequest, Client, Environment, ApiError, Error } from 'square';
import JSONBig from 'json-bigint';
import * as functions from 'firebase-functions';

export async function createCheckoutLink(body: CreatePaymentLinkRequest) {
  try {
    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: Environment.Production,
    });

    const response = await client.checkoutApi.createPaymentLink(body);
    return JSONBig.parse(JSONBig.stringify(response.result));
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach(function (e: Error) {
        functions.logger.log(e.category);
        functions.logger.log(e.code);
        functions.logger.log(e.detail);
      });
      return error.result.errors;
    } else {
      functions.logger.log('Unexpected error occurred: ', error);
    }
  }
}
