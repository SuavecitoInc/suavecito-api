import stores from './stores.js';

type ShopifyConfig = {
  apiVersion: string;
  stores: {
    [key: string]: {
      store: string;
      apiKey: string;
    };
  };
};

const shopifyConfig: ShopifyConfig = {
  apiVersion: process.env.SHOPIFY_API_VERSION,
  stores,
};

export type ShopifyStore = keyof ShopifyConfig['stores'];

export default shopifyConfig;
