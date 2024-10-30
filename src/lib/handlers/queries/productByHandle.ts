const query = `#graphql
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      descriptionHtml
      hasOnlyDefaultVariant
      legacyResourceId
      onlineStoreUrl
      productType
      tracksInventory
      vendor
      options {
        name
        values
      }
      tags
      variants(first:25) {
        edges {
          node {
            id
            title
            barcode
            price
            compareAtPrice
            sku
            legacyResourceId
            position
            availableForSale
            inventoryPolicy
            inventoryItem {
              measurement {
                weight {
                  unit
                  value
                }
              }
            }
          }
        }
      }   
    }
  }
`;

export default query;
