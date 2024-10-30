import type { Request, Response } from 'express';
import { shopifyProduct } from '../lib/helpers/shopify/product.js';

export const postItemToShopify = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { shopifyStore, product } = req.body;

  console.log('shopifyStore: ' + shopifyStore);
  console.log('product: ' + product);

  try {
    const response = await shopifyProduct(shopifyStore, product);
    res.status(200).json({
      product: {
        legacyResourceId: response,
      },
      error: null,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      product: null,
      error: err.message,
    });
  }
};
