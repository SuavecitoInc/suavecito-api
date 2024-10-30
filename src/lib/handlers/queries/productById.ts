const query = `#graphql
  query ProductById($id: ID!) {
    product(id: $id) {
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
