import * as functions from 'firebase-functions';
import { Router } from 'express';
import { getAllProducts, getCatalogItem, getCatalogItems } from '../../controllers/hedsWorld/catalog';

const router = Router();

router.get('/get-catalog-items', async (req, res) => {
  try {
    functions.logger.log('get-catalog-items');
    const results = await getCatalogItems();
    return res.json(results);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

router.get('/get-all-products', async (req, res) => {
  try {
    functions.logger.log('get-all-products');
    const results = await getAllProducts();
    return res.json(results);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

router.get('/product/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        functions.logger.log('product', itemId);
        const results = await getCatalogItem(itemId);
        return res.json(results);
      } catch (err: any) {
        return res.status(500).send(err.message);
      }
});

export default router;
