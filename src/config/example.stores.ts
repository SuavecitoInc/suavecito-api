import dotenv from 'dotenv';

dotenv.config();

const stores = {
  store_1: {
    store: process.env.SHOPIFY_STORE_1,
    apiKey: process.env.SHOPIFY_STORE_1_API_KEY,
  },
  store_2: {
    store: process.env.SHOPIFY_STORE_2,
    apiKey: process.env.SHOPIFY_STORE_2_API_KEY,
  },
};

export default stores;
