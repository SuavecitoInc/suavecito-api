# Suavecito API

> NetSuite to Shopify API

## Setup

Environmental Variables:

```bash
# shopify
SHOPIFY_API_VERSION=2024-07
SECRET_KEY=
# retail
SHOPIFY_RETAIL_STORE=suavecito
SHOPIFY_RETAIL_API_KEY=
# wholesale
SHOPIFY_WHOLESALE_STORE=suavecito-wholesale
SHOPIFY_WHOLESALE_API_KEY=
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
