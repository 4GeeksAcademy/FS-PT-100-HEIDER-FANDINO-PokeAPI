import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import pokeballIcon from "../assets/img/pokeball.png"; 

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar navbar-light bg-light mb-4 px-4">
      <div className="container d-flex justify-content-between align-items-center">

        {/* Logo con pokebola */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={pokeballIcon}
            alt="Pokeball"
            style={{
              width: "48px",        
              marginRight: "12px"  
            }}
          />
          <span className="fw-bold fs-4">Pokémon Blog</span>
        </Link>

        {/* Dropdown de favoritos */}
        <div className="dropdown ms-auto">
          <button
            className="btn btn-outline-warning dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Favoritos ({store.favorites.length})
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {store.favorites.length === 0 ? (
              <li className="dropdown-item text-muted">Sin favoritos</li>
            ) : (
              store.favorites.map((fav, index) => (
                <li
                  key={index}
                  className="dropdown-item d-flex justify-content-between align-items-center"
                >
                  {fav}
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => dispatch({ type: "remove_favorite", payload: fav })}
                  >
                    🗑️
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
