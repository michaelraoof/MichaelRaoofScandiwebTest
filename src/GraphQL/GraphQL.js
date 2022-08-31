import { gql } from "@apollo/client";
export const Get_Products = gql`
  query category($categorytitle: String!) {
    category(input: { title: $categorytitle }) {
      products {
        category
        brand
        name
        id
        gallery
        inStock

        prices {
          amount
          currency {
            symbol
          }
        }

        attributes {
          id
          name
          type
          items {
            displayValue
            value
          }
        }
      }
    }
  }
`;

export const Get_Productdescription = gql`
  query product($productdescriptionID: String!) {
    product(id: $productdescriptionID) {
      category
      brand
      name
      id
      gallery
      inStock
      description
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          displayValue
          value
        }
      }
    }
  }
`;
export const Get_categories_names = gql`
  query {
    categories {
      name
    }
  }
`;
export const Get_Currencies = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
