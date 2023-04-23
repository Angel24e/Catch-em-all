// .addOrder = .addAdoption
import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ADOPTION } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addAdoption] = useMutation(ADD_ADOPTION);

  useEffect(() => {
    async function saveAdoption() {
      const cart = await idbPromise('cart', 'get');
      const pokemon = cart.map((item) => item._id);

      if (pokemon.length) {
        const { data } = await addAdoption({ variables: { pokemon } });
        const pokemonData = data.addAdoption.pokemon;

        pokemonData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveAdoption();
  }, [addAdoption]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for giving your pokemon a new home!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
