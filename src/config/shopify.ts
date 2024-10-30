import dotenv from 'dotenv';

dotenv.config();

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
  stores: {
    retail: {
      store: process.env.SHOPIFY_RETAIL_STORE,
      apiKey: process.env.SHOPIFY_RETAIL_API_KEY,
    },
    wholesale: {
      store: process.env.SHOPIFY_WHOLESALE_STORE,
      apiKey: process.env.SHOPIFY_WHOLESALE_API_KEY,
    },
  },
};

export default shopifyConfig;
