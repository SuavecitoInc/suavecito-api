import {
  handleize,
  shopifyAdmin,
  createShopifyError,
  createShopifyUserError,
} from '../../utils/shopify.js';
import { defaultVendor } from '../../const.js';
import { productByHandle } from '../../handlers/queries/index.js';
import {
  productCreate,
  productUpdate,
  productVariantsBulkCreate,
  productVariantsBulkUpdate,
} from '../../handlers/mutations/index.js';
import type {
  ProductByHandleQuery,
  ProductCreateMutation,
  ProductUpdateMutation,
  ProductVariantsBulkCreateMutation,
  ProductVariantsBulkUpdateMutation,
} from '../../types/admin.generated.js';
import type { Maybe } from '../../types/admin.types.js';

type NetSuiteItem = {
  title: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  option: string;
  variants: {
    optionValues: {
      optionName: string;
      name: string;
    }[];
    price: string;
    inventoryItem: {
      sku: string;
      measurement: {
        weight: {
          value: number;
          unit: string;
        };
      };
    };
    barcode: string;
  }[];
};

type ShopifyProductData = {
  id?: string;
  legacyResourceId?: string;
  title: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  productOptions: { name: string; values: { name: string }[] }[];
  tags: string[];
  variants: {
    id?: string;
    barcode: string;
    optionValues: {
      optionName: string;
      name: string;
    }[];
    price: string;
    inventoryItem: {
      sku: string;
      measurement: {
        weight: {
          value: number;
          unit: string;
        };
      };
      tracked: boolean;
    };
    inventoryPolicy: 'DENY';
  }[];
};

type ShopifyProductResult = {
  id: string;
  legacyResourceId: string;
  title: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tracksInventory: boolean;
  options: { name: string; values: string[] }[];
  tags: string[];
  variants: {
    id: string;
    legacyResourceId: string;
    title: string;
    barcode: Maybe<string> | undefined;
    price: string;
    sku: Maybe<string> | undefined;
    weight: number;
    weightUnit: string;
    compareAtPrice?: string;
  }[];
};

async function createShopifyVariants(
  store: string,
  productId: string,
  variants: ShopifyProductData['variants']
) {
  const VariantsInput = {
    productId,
    variants,
  };

  const response = await shopifyAdmin<ProductVariantsBulkCreateMutation>(
    store,
    productVariantsBulkCreate,
    VariantsInput
  );

  if (response?.errors) {
    createShopifyError(response.errors);
  }

  if (response?.data?.productVariantsBulkCreate?.userErrors) {
    createShopifyUserError(response.data.productVariantsBulkCreate.userErrors);
  }

  return response;
}

async function createShopifyProduct(store: string, data: ShopifyProductData) {
  const productInput = {
    input: {
      title: data.title,
      descriptionHtml: data.descriptionHtml,
      vendor: data.vendor,
      productType: data.productType,
      productOptions: data.productOptions,
      tags: data.tags,
    },
  };

  const response = await shopifyAdmin<ProductCreateMutation>(
    store,
    productCreate,
    productInput
  );

  if (response?.errors) {
    createShopifyError(response.errors);
  }

  if (response?.data?.productCreate?.userErrors) {
    createShopifyUserError(response.data.productCreate.userErrors);
  }

  return response;
}

async function createProduct(store: string, data: ShopifyProductData) {
  const productResponse = await createShopifyProduct(store, data);

  if (!productResponse?.data?.productCreate?.product) {
    throw new Error('Product not created');
  }

  console.log('PRODUCT RESPONSE', JSON.stringify(productResponse, null, 2));

  const variantsResponse = await createShopifyVariants(
    store,
    productResponse.data.productCreate.product.id,
    data.variants
  );

  if (!variantsResponse?.data?.productVariantsBulkCreate) {
    throw new Error('Product not created');
  }

  return productResponse;
}

async function updateShopifyVariants(
  store: string,
  productId: string,
  variants: ShopifyProductData['variants']
) {
  const VariantsInput = {
    productId,
    variants,
  };

  const response = await shopifyAdmin<ProductVariantsBulkUpdateMutation>(
    store,
    productVariantsBulkUpdate,
    VariantsInput
  );

  if (response?.errors) {
    createShopifyError(response.errors);
  }

  if (response?.data?.productVariantsBulkUpdate?.userErrors) {
    createShopifyUserError(response.data.productVariantsBulkUpdate.userErrors);
  }

  return response;
}

async function updateShopifyProduct(
  store: string,
  sProd: ShopifyProductResult,
  data: ShopifyProductData,
  id: string
) {
  const productId = sProd.id;

  console.log('UPDATING PRODUCT ID:', productId);

  const productInput = {
    input: {
      id: productId,
      title: data.title,
      descriptionHtml: data.descriptionHtml,
      vendor: data.vendor,
      productType: data.productType,
      tags: data.tags,
    },
  };

  console.log('PRODUCT INPUT', JSON.stringify(productInput, null, 2));

  const productResponse = await shopifyAdmin<ProductUpdateMutation>(
    store,
    productUpdate,
    productInput
  );
  console.log('UPDATED PRODUCT RESPONSE');
  if (productResponse?.errors) {
    createShopifyError(productResponse.errors);
  }

  if (productResponse?.data?.productUpdate?.userErrors) {
    createShopifyUserError(productResponse.data.productUpdate.userErrors);
  }

  return productResponse;
}

async function updateProduct(
  store: string,
  sProd: ShopifyProductResult,
  data: ShopifyProductData,
  id: string
) {
  const productResponse = await updateShopifyProduct(store, sProd, data, id);

  if (!productResponse?.data?.productUpdate?.product) {
    throw new Error('Product not updated');
  }
  // variants
  const shopifyVariants = sProd.variants;
  console.log('UPDATING VARIANT(s) WITH SHOPIFY ID(s)');
  data.variants.forEach((uVariant) => {
    shopifyVariants.forEach((sVariant) => {
      if (uVariant.inventoryItem.sku === sVariant.sku) {
        uVariant.id = sVariant.id;
      }
    });
  });

  console.log('UPDATED VARIANTS', JSON.stringify(data.variants, null, 2));

  const productId = sProd.id;

  const variantsResponse = await updateShopifyVariants(
    store,
    productId,
    data.variants
  );

  console.log('VARIANTS RESPONSE', variantsResponse);

  if (!variantsResponse?.data?.productVariantsBulkUpdate) {
    throw new Error('Product not updated');
  }

  return productResponse;
}

async function searchShopifyProductByHandle(store: string, handle: string) {
  const response = await shopifyAdmin<ProductByHandleQuery>(
    store,
    productByHandle,
    {
      handle,
    }
  );

  if (response?.errors) {
    createShopifyError(response.errors);
  }

  if (response.data.productByHandle) {
    const { productByHandle } = response.data;
    const product: ShopifyProductResult = {
      legacyResourceId: productByHandle.legacyResourceId,
      id: productByHandle.id,
      options: productByHandle.options,
      title: productByHandle.title,
      descriptionHtml: productByHandle.descriptionHtml,
      vendor: productByHandle.vendor,
      productType: productByHandle.productType,
      tracksInventory: true,
      tags: productByHandle.tags,
      variants: [],
    };

    let variantList: ShopifyProductResult['variants'] = [];
    productByHandle.variants.edges.forEach((variant) => {
      variantList.push({
        legacyResourceId: variant.node.legacyResourceId || '',
        id: variant.node.id,
        title: variant.node.title,
        barcode: variant.node.barcode || '',
        price: variant.node.price,
        compareAtPrice: variant.node.compareAtPrice,
        sku: variant.node.sku || '',
        weight: variant.node.inventoryItem?.measurement?.weight?.value || 0,
        weightUnit: variant.node.inventoryItem?.measurement?.weight?.unit || '',
      });
    });

    product.variants = variantList;

    console.log('FOUND PRODUCT ID: ' + product.legacyResourceId);

    return product;
  } else {
    console.log('PRODUCT NOT FOUND');
    return false;
  }
}

export async function shopifyProduct(
  store: string,
  item: NetSuiteItem
): Promise<string> {
  console.log('++++++++++ SHOPIFY PRODUCT ++++++++++');
  console.log('NETSUITE ITEM', JSON.stringify(item, null, 2));

  const optionName = item.variants[0].optionValues[0].optionName;

  const variants: ShopifyProductData['variants'] =
    typeof item.variants === 'string'
      ? JSON.parse(item.variants)
      : item.variants;

  const data: ShopifyProductData = {
    title: item.title,
    descriptionHtml: unescape(item.descriptionHtml),
    vendor: item.vendor ? item.vendor : defaultVendor,
    productType: item.productType,
    productOptions: [
      {
        name: optionName ? optionName : 'Title',
        values: variants.map((variant) => ({
          name: variant.optionValues[0].name,
        })),
      },
    ],
    tags: [],
    variants: [],
  };
  // add tags if they exist
  if (item.tags.length > 0) {
    data.tags = item.tags;
  }

  data.variants = variants;

  console.log(
    '++++++++++ SHOPIFY PRODUCT DATA ++++++++++',
    JSON.stringify(data, null, 2)
  );

  const handle = handleize(item.title);
  console.log('SEARCHING FOR PRODUCT WITH HANDLE:', handle);

  const searchResult = await searchShopifyProductByHandle(store, handle);

  console.log('SEARCH RESULT', JSON.stringify(searchResult, null, 2));

  // product exists
  if (searchResult) {
    const updatedResponse = await updateProduct(
      store,
      searchResult,
      data,
      searchResult.id
    );
    console.log('UPDATED PRODUCT ' + searchResult.id);
    return updatedResponse?.data?.productUpdate?.product?.legacyResourceId;
  }

  // doesn't exist lets create
  const createdResponse = await createProduct(store, data);
  console.log(
    'CREATED PRODUCT ' +
      createdResponse?.data?.productCreate?.product?.legacyResourceId
  );

  return createdResponse?.data?.productCreate?.product?.legacyResourceId;
}
