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

    /**
     * @get_all_images
     */
    const allImages = await catalogApi.searchCatalogObjects({
      objectTypes: ['ITEM'],
      includeRelatedObjects: true,
      includeDeletedObjects: false,
    });
    const imageMap: { [key: string]: any } = {};
    allImages?.result?.relatedObjects?.forEach((obj) => {
      if (obj.type === 'IMAGE') {
        imageMap[obj.id] = obj.imageData?.url;
      }
    });
    /**
     * @combine_images_and_products
     */
    const productsWithImage = [];
    if (!filteredProducts) return null;
    else {
      for (const product of filteredProducts) {
        let productImages: string[] = [];
        if (product?.itemData?.imageIds?.length) {
          productImages = product?.itemData?.imageIds?.map((imageId) => imageMap[imageId]);
        }
        productsWithImage.push({ ...product, productImages: productImages });
      }
      return JSONBig.parse(JSONBig.stringify(productsWithImage));
    }
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
    const response = await client.catalogApi.retrieveCatalogObject(itemId);
    const allImages = await client.catalogApi.searchCatalogObjects({
      objectTypes: ['ITEM'],
      includeRelatedObjects: true,
      includeDeletedObjects: false,
    });
    const imageMap: { [key: string]: any } = {};
    allImages?.result?.relatedObjects?.forEach((obj) => {
      if (obj.type === 'IMAGE') {
        imageMap[obj.id] = obj.imageData?.url;
      }
    });

    let productImages: string[] = [];
    if (response.result.object?.itemData?.imageIds?.length) {
      productImages = response.result.object?.itemData?.imageIds?.map((imageId) => imageMap[imageId]);
    }
    const productWithPicture = { ...response.result.object, productImages: productImages };
    return JSONBig.parse(JSONBig.stringify(productWithPicture));
  } catch (error) {
    console.log(error);
  }
}
