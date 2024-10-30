# Suavecito API

> NetSuite to Shopify API

## Setup

Environmental Variables:

```bash
# shopify
SHOPIFY_API_VERSION=2024-07 # shopify admin api version
SECRET_KEY= # random string used for hash / digest
SHOPIFY_STORE_1= # the shopify store name without the .myshopify.com
SHOPIFY_STORE_1__API_KEY= # shopify admin api token
...
...
```

`src/config/stores.ts`

```typescript
const stores = {
  store_1: {
    store: process.env.SHOPIFY_STORE_1,
    apiKey: process.env.SHOPIFY_STORE_1_API_KEY,
  },
  store_2: {
    store: process.env.SHOPIFY_STORE_2,
    apiKey: process.env.SHOPIFY_STORE_2_API_KEY,
  },
  store_3: {
    store: process.env.SHOPIFY_STORE_3,
    apiKey: process.env.SHOPIFY_STORE_3_API_KEY,
  },
};

export default stores;
```

## Endpoints:

<table>
  <thead>
    <tr>
      <th>Endpoint</th>
      <th>Method</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/v1/:store/product</td>
      <td>POST</td>
      <td>This endpoint creates a Shopify product from a NetSuite item record.</td>
    </tr>
  </tbody>
</table>
