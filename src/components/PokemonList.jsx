import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../styles/pokemon.css"; 

export const PokemonList = () => {
  const { store, dispatch } = useGlobalReducer();
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then(res => res.json())
      .then(data => {
        setPokemons(data.results);
        console.log("Pokémon cargados:", data.results);
      })
      .catch(err => console.error("Error al cargar Pokémon:", err));
  }, []);

  return (
    <div className="container">
      <h1 className="my-4 text-center">Pokédex</h1>
      <div className="row">
        {pokemons.map((pokemon, index) => (
          <div key={index} className="col-sm-6 col-md-4 mb-4">
            <div className="pokemon-card">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                className="card-img-top p-4"
                alt={pokemon.name}
              />
              <div className="card-body text-center">
                <h5 className="card-title text-capitalize">{pokemon.name}</h5>
                <Link
                  to={`/details/${pokemon.name}`}
                  className="btn btn-outline-light me-2"
                >
                  Detalles
                </Link>
                <button
                  className="btn btn-warning"
                  onClick={() => dispatch({ type: "add_favorite", payload: pokemon.name })}
                >
                  ⭐ Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
