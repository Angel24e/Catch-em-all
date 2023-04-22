//addOrder = addAdoption ; ADD_ORDER = ADD_ADOPTION ; products = pokemon ; category = type;
import { useReducer } from "react";
import {
  UPDATE_POKEMON,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_TYPES,
  UPDATE_CURRENT_TYPES,
  TOGGLE_CART
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_POKEMON:
      return {
        ...state,
        pokemon: [...action.pokemon],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.pokemon],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.pokemon],
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(pokemon => {
          if (action._id === pokemon._id) {
            pokemon.adoptionQuantity = action.adoptionQuantity
          }
          return pokemon
        })
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter(pokemon => {
        return pokemon._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };

    case UPDATE_TYPES:
      return {
        ...state,
        types: [...action.categories],
      };

    case UPDATE_CURRENT_TYPES:
      return {
        ...state,
        currentTypes: action.currentCategory
      }

    default:
      return state;
  }
};

export function usePokemonReducer(initialState) {
  return useReducer(reducer, initialState)
}
