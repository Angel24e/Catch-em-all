const { gql } = require('apollo-server-express');
// Change category to type, Product to pokemon, and order to adoption
// Change in the query and mutation type as well
const typeDefs = gql`
  type Type {
    _id: ID
    name: String
  }

  type Pokemon {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    type: Type
  }

  type Adoption {
    _id: ID
    purchaseDate: String
    pokemons: [Pokemon]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    adoptions: [Adoption]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    types: [Type]
    pokemons(type: ID, name: String): [Pokemon]
    pokemon(_id: ID!): Pokemon
    user: User
    adoption(_id: ID!): Adoption
    checkout(pokemons: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addAdoption(pokemons: [ID]!): Adoption
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updatePokemon(_id: ID!, quantity: Int!): Pokemon
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
