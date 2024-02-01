import { Client, Environment, ApiError, Error } from 'square';
import JSONBig from 'json-bigint';
import * as functions from 'firebase-functions';

export async function getCatalogItems() {
  try {
    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: Environment.Production,
    });
    const { catalogApi } = client;
    let catalogItemsResponse = await catalogApi.listCatalog();
    return JSONBig.parse(JSONBig.stringify(catalogItemsResponse.result.objects));
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

export async function getAllProducts() {
  try {
    functions.logger.log('Fetching all products');
    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: Environment.Production,
    });
    /**
     * @get_all_products
     */
    const catalogApi = client.catalogApi;
    const allProducts = await catalogApi.listCatalog(undefined, 'ITEM', undefined, undefined);
    const filteredProducts = allProducts?.result?.objects?.filter((obj) => {
      const isPresentAtAllLocations = obj?.presentAtAllLocations === true;
      return false || isPresentAtAllLocations;
    });
    // return JSONBig.parse(JSONBig.stringify(filteredProducts));
    return filteredProducts;
  } catch (error) {
    functions.logger.log(`Error fetching products:", ${error}`);
    return error;
  }
}

export async function getCatalogItem(itemId: string) {
  functions.logger.log('Fetching product', itemId);
  const client = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Production,
  });
  try {
    const product = await client.catalogApi.retrieveCatalogObject(itemId);

    // return JSONBig.parse(JSONBig.stringify(product.result.object));
    return product.result.object;
  } catch (error) {
    console.log(error);
    return; 
  }
}
