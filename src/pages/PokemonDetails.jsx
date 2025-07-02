import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/pokemon.css"; 


export const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => setPokemon(data))
      .catch(err => console.error("Error al cargar detalles:", err));
  }, [name]);

  if (!pokemon) return <div className="container mt-4 text-center">Cargando detalles...</div>;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-secondary mb-3">⬅ Volver</Link>
      <div className="pokemon-details-card">
        <h1 className="text-capitalize mb-4">{pokemon.name}</h1>
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="img-fluid mb-4"
        />
        <p><strong>ID:</strong> {pokemon.id}</p>
        <p><strong>Altura:</strong> {pokemon.height}</p>
        <p><strong>Peso:</strong> {pokemon.weight}</p>
        <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
        <p><strong>Tipos:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
      </div>
    </div>
  );
};
