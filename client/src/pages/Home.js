// File name change: ProductList = PokemonList
// CategoryMenu = TypeMenu
import React from "react";
import ProductList from "../components/PokemonList";
import CategoryMenu from "../components/TypeMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
