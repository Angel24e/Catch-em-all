/*Product = Pokemon
Order = Adopt 
purchaseDate = adoptionDate*/
import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

//function OrderHistory() {
function AdoptHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Pokemon</Link>

        {user ? (
          <>
            <h2>
              Adoption History for {user.firstName} {user.lastName}
            </h2>
            {user.adoptions.map((adopt) => (
              <div key={adopt._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.adoptionDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.pokemon.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/pokemon/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default AdoptionHistory;
