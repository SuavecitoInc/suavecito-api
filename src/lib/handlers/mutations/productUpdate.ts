const mutation = `#graphql
  mutation productUpdate($input: ProductInput!){
    productUpdate(input: $input) {
      product {
        id
        legacyResourceId
      }
      userErrors {
        message
        field
      }
    }
  }
`;

export default mutation;
