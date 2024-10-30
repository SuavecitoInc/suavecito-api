/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type ProductCreateMutationVariables = AdminTypes.Exact<{
  input: AdminTypes.ProductInput;
}>;


export type ProductCreateMutation = { productCreate?: AdminTypes.Maybe<{ product?: AdminTypes.Maybe<Pick<AdminTypes.Product, 'id' | 'legacyResourceId'>>, userErrors: Array<Pick<AdminTypes.UserError, 'message' | 'field'>> }> };

export type ProductUpdateMutationVariables = AdminTypes.Exact<{
  input: AdminTypes.ProductInput;
}>;


export type ProductUpdateMutation = { productUpdate?: AdminTypes.Maybe<{ product?: AdminTypes.Maybe<Pick<AdminTypes.Product, 'id' | 'legacyResourceId'>>, userErrors: Array<Pick<AdminTypes.UserError, 'message' | 'field'>> }> };

export type ProductVariantsBulkCreateMutationVariables = AdminTypes.Exact<{
  productId: AdminTypes.Scalars['ID']['input'];
  variants: Array<AdminTypes.ProductVariantsBulkInput> | AdminTypes.ProductVariantsBulkInput;
}>;


export type ProductVariantsBulkCreateMutation = { productVariantsBulkCreate?: AdminTypes.Maybe<{ userErrors: Array<Pick<AdminTypes.ProductVariantsBulkCreateUserError, 'field' | 'message'>>, product?: AdminTypes.Maybe<(
      Pick<AdminTypes.Product, 'id'>
      & { options: Array<(
        Pick<AdminTypes.ProductOption, 'id' | 'name' | 'values' | 'position'>
        & { optionValues: Array<Pick<AdminTypes.ProductOptionValue, 'id' | 'name' | 'hasVariants'>> }
      )> }
    )>, productVariants?: AdminTypes.Maybe<Array<(
      Pick<AdminTypes.ProductVariant, 'id' | 'title'>
      & { selectedOptions: Array<Pick<AdminTypes.SelectedOption, 'name' | 'value'>> }
    )>> }> };

export type ProductVariantsBulkUpdateMutationVariables = AdminTypes.Exact<{
  productId: AdminTypes.Scalars['ID']['input'];
  variants: Array<AdminTypes.ProductVariantsBulkInput> | AdminTypes.ProductVariantsBulkInput;
}>;


export type ProductVariantsBulkUpdateMutation = { productVariantsBulkUpdate?: AdminTypes.Maybe<{ product?: AdminTypes.Maybe<Pick<AdminTypes.Product, 'id'>>, productVariants?: AdminTypes.Maybe<Array<(
      Pick<AdminTypes.ProductVariant, 'id'>
      & { metafields: { edges: Array<{ node: Pick<AdminTypes.Metafield, 'namespace' | 'key' | 'value'> }> } }
    )>>, userErrors: Array<Pick<AdminTypes.ProductVariantsBulkUpdateUserError, 'field' | 'message'>> }> };

export type ProductByHandleQueryVariables = AdminTypes.Exact<{
  handle: AdminTypes.Scalars['String']['input'];
}>;


export type ProductByHandleQuery = { productByHandle?: AdminTypes.Maybe<(
    Pick<AdminTypes.Product, 'id' | 'handle' | 'title' | 'descriptionHtml' | 'hasOnlyDefaultVariant' | 'legacyResourceId' | 'onlineStoreUrl' | 'productType' | 'tracksInventory' | 'vendor' | 'tags'>
    & { options: Array<Pick<AdminTypes.ProductOption, 'name' | 'values'>>, variants: { edges: Array<{ node: (
          Pick<AdminTypes.ProductVariant, 'id' | 'title' | 'barcode' | 'price' | 'compareAtPrice' | 'sku' | 'legacyResourceId' | 'position' | 'availableForSale' | 'inventoryPolicy'>
          & { inventoryItem: { measurement: { weight?: AdminTypes.Maybe<Pick<AdminTypes.Weight, 'unit' | 'value'>> } } }
        ) }> } }
  )> };

export type ProductByIdQueryVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
}>;


export type ProductByIdQuery = { product?: AdminTypes.Maybe<(
    Pick<AdminTypes.Product, 'id' | 'handle' | 'title' | 'descriptionHtml' | 'hasOnlyDefaultVariant' | 'legacyResourceId' | 'onlineStoreUrl' | 'productType' | 'tracksInventory' | 'vendor' | 'tags'>
    & { options: Array<Pick<AdminTypes.ProductOption, 'name' | 'values'>>, variants: { edges: Array<{ node: (
          Pick<AdminTypes.ProductVariant, 'id' | 'title' | 'barcode' | 'price' | 'compareAtPrice' | 'sku' | 'legacyResourceId' | 'position' | 'availableForSale' | 'inventoryPolicy'>
          & { inventoryItem: { measurement: { weight?: AdminTypes.Maybe<Pick<AdminTypes.Weight, 'unit' | 'value'>> } } }
        ) }> } }
  )> };

interface GeneratedQueryTypes {
  "#graphql\n  query ProductByHandle($handle: String!) {\n    productByHandle(handle: $handle) {\n      id\n      handle\n      title\n      descriptionHtml\n      hasOnlyDefaultVariant\n      legacyResourceId\n      onlineStoreUrl\n      productType\n      tracksInventory\n      vendor\n      options {\n        name\n        values\n      }\n      tags\n      variants(first:25) {\n        edges {\n          node {\n            id\n            title\n            barcode\n            price\n            compareAtPrice\n            sku\n            legacyResourceId\n            position\n            availableForSale\n            inventoryPolicy\n            inventoryItem {\n              measurement {\n                weight {\n                  unit\n                  value\n                }\n              }\n            }\n          }\n        }\n      }   \n    }\n  }\n": {return: ProductByHandleQuery, variables: ProductByHandleQueryVariables},
  "#graphql\n  query ProductById($id: ID!) {\n    product(id: $id) {\n      id\n      handle\n      title\n      descriptionHtml\n      hasOnlyDefaultVariant\n      legacyResourceId\n      onlineStoreUrl\n      productType\n      tracksInventory\n      vendor\n      options {\n        name\n        values\n      }\n      tags\n      variants(first:25) {\n        edges {\n          node {\n            id\n            title\n            barcode\n            price\n            compareAtPrice\n            sku\n            legacyResourceId\n            position\n            availableForSale\n            inventoryPolicy\n            inventoryItem {\n              measurement {\n                weight {\n                  unit\n                  value\n                }\n              }\n            }\n          }\n        }\n      }   \n    }\n  }\n": {return: ProductByIdQuery, variables: ProductByIdQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n  mutation productCreate($input: ProductInput!){\n    productCreate(input: $input) {\n      product {\n        id\n        legacyResourceId\n      }\n      userErrors {\n        message\n        field\n      }\n    }\n  }\n": {return: ProductCreateMutation, variables: ProductCreateMutationVariables},
  "#graphql\n  mutation productUpdate($input: ProductInput!){\n    productUpdate(input: $input) {\n      product {\n        id\n        legacyResourceId\n      }\n      userErrors {\n        message\n        field\n      }\n    }\n  }\n": {return: ProductUpdateMutation, variables: ProductUpdateMutationVariables},
  "#graphql\n  mutation ProductVariantsBulkCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {\n    productVariantsBulkCreate(productId: $productId, strategy: REMOVE_STANDALONE_VARIANT, variants: $variants) {\n      userErrors {\n        field\n        message\n      }\n      product {\n        id\n        options {\n          id\n          name\n          values\n          position\n          optionValues {\n            id\n            name\n            hasVariants\n          }\n        }\n      }\n      productVariants {\n        id\n        title\n        selectedOptions {\n          name\n          value\n        }\n      }\n    }\n  }\n": {return: ProductVariantsBulkCreateMutation, variables: ProductVariantsBulkCreateMutationVariables},
  "#graphql\n  mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {\n    productVariantsBulkUpdate(productId: $productId, variants: $variants) {\n      product {\n        id\n      }\n      productVariants {\n        id\n        metafields(first: 2) {\n          edges {\n            node {\n              namespace\n              key\n              value\n            }\n          }\n        }\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: ProductVariantsBulkUpdateMutation, variables: ProductVariantsBulkUpdateMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
