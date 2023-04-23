/*StoreProvider = AdoptionProvider
useProductReducer = usePokemonReducer 
useStoreContext = useAdoptionContext
StoreContext = AdoptionContext
currentCategory = currentType 
products = pokemon
categories = type */
import React, { createContext, useContext } from "react";
import { usePokemonReducer } from './reducers'

const AdoptionContext = createContext();
const { Provider } = AdoptionContext;

const adoptionProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = usePokemonReducer({
    pokemon: [],
    cart: [],
    cartOpen: false,
    types: [],
    currentType: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useAdoptionContext = () => {
  return useContext(AdoptionContext);
};

export { AdoptionProvider, useAdoptionContext };
