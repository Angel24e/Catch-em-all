//addOrder = addAdoption ; ADD_ORDER = ADD_ADOPTION ; products = pokemon ; category = type;
import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getPokemon($category: ID) {
    products(types: $types) {
      _id
      name
      description
      price
      quantity
      image
      types {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getPokemon($pokemon: [ID]!) {
    checkout(pokemon: $pokemon) {
      session
    }
  }
`;

export const QUERY_ALL_POKEMON = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      types {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    types {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        adoptionDate
        pokemon {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
