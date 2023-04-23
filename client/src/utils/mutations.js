//addOrder = addAdoption ; ADD_ORDER = ADD_ADOPTION ; products = pokemon ; category = type;

import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ADOPTION = gql`
  mutation addAdoption($products: [ID]!) {
    addAdoption(pokemon: $pokemon) {
      adoptionDate
      pokemon {
        _id
        name
        description
        price
        quantity
        type {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
