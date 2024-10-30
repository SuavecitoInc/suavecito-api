import fetch from 'node-fetch';
import shopifyConfig from '../../config/shopify.js';

type ShopifyResponse<T> = {
  // status: number;
  data: T;
  errors?: string | { message: string }[];
};

export async function shopifyAdmin<T>(
  store: string,
  query: string,
  variables?: Record<string, unknown>
): Promise<ShopifyResponse<T>> {
  const body: { query: string; variables?: any } = {
    query,
  };

  if (variables) {
    body.variables = variables;
  }

  const config = shopifyConfig.stores[store];

  const url = `https://${config.store}.myshopify.com/admin/api/${shopifyConfig.apiVersion}/graphql.json`;
  const token = config.apiKey;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify(body),
  });
  const data = (await response.json()) as ShopifyResponse<T>;
  console.log('SHOPIFY RESPONSE DATA =============>', data);
  return data;
}

export async function shopifyAdminRest(
  store: string,
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: Record<string, unknown>
): Promise<any> {
  const config = shopifyConfig.stores[store];

  const url = `https://${config.store}.myshopify.com/admin/api/${shopifyConfig.apiVersion}/${endpoint}.json`;
  const token = config.apiKey;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  const responseData = await response.json();

  return responseData;
}

export function handleize(text: string): string {
  return text
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^\w\u00C0-\u024f]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function createShopifyError(errors: string | { message: string }[]) {
  if (errors.length === 0) return;

  const errorMsg =
    typeof errors[0] === 'string' ? errors.toString() : errors[0].message;
  throw new Error(errorMsg);
}

export function createShopifyUserError(errors: { message: string }[]) {
  if (errors.length === 0) return;

  const errorMsg = errors[0].message;
  throw new Error(errorMsg);
}
