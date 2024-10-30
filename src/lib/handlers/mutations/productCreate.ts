const mutation = `#graphql
  mutation productCreate($input: ProductInput!){
    productCreate(input: $input) {
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
