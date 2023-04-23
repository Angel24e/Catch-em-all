/*Variable Changes
PRODUCT = POKEMON */

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  //UPDATE_PRODUCTS
  UPDATE_POKEMON,
} from '../utils/actions';
//QUERY_PRODUCTS
import { QUERY_POKEMON } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  //currentProduct, setCurrentProduct
  const [currentPokemon, setCurrentPokemon] = useState({});

  //QUERY_PRODUCTS
  const { loading, data } = useQuery(QUERY_POKEMON);

  //products
  const { pokemon, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      //setCurrentProducts ;; products.find((product) => pokemon._id)
      setCurrentPokemon(pokemon.find((pokemon) => pokemon._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        //UPDATE_POKEMON
        type: UPDATE_POKEMON,
        //data.products
        products: data.pokemon,
      });
        //data.pokemon
      data.pokemon.forEach((pokemon) => {
        //'products', 'put', product
        idbPromise('pokemon', 'put', pokemon);
      });
    }
    // get cache from idb
    else if (!loading) {
      // 'product', 'get', indexedProducts
      idbPromise('pokemon', 'get').then((indexedPokemon) => {
        dispatch({
          //UPDATE_POKEMON
          type: UPDATE_POKEMON,
          //products: indexedProduct,
          products: indexedPokemon,
        });
      });
    }
    //products
  }, [pokemon, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        //type === ???
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        //product: {...currentProduct, purchaseQuantity: 1},
        pokemon: { ...currentPokemon, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentPokemon, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      //currentProduct
      _id: currentPokemon._id,
    });

    //currentProduct
    idbPromise('cart', 'delete', { ...currentPokemon });
  };

  return ( //Possible variable change

    //currentProduct
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Pokemon</Link>
          <h2>{currentPokemon.name}</h2>
          <p>{currentPokemon.description}</p>

          <p>
            <strong>Price:</strong>${currentPokemon.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentPokemon._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>
          <img
            src={`/images/${currentPokemon.image}`}
            alt={currentPokemon.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
