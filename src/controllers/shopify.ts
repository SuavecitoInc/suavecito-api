import type { Request, Response } from 'express';
import { shopifyProduct } from '../lib/helpers/shopify/product.js';

export const postItemToShopify = async (
  req: Request,
  res: Response
): Promise<void> => {
  const store = req.params.store;
  try {
    const response = await shopifyProduct(store, req.body);
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
