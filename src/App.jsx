import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [limit, setLimit] = useState(10);
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      setPokemonList(response.data.results);
    } catch (error) {
      console.error("Error al obtener los datos de Pokémon:", error);
    }
  };

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await axios.get(url);
      setSelectedPokemon(response.data);
    } catch (error) {
      console.error("Error al obtener detalles del Pokémon:", error);
    }
  };

  useEffect(() => {
    fetchPokemon();
    setSelectedPokemon(null); // Limpiar selección si se cambia el número
  }, [limit]);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setLimit(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Pokémon List</h1>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Cantidad de Pokémon a mostrar:</label>
          <input
            type="number"
            value={limit}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            min={1}
          />
        </div>

        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b text-left">Nombre</th>
              <th className="py-2 px-4 border-b text-left">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {pokemonList.map((pokemon, index) => (
              <Fragment key={pokemon.name}>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                  <td className="py-2 px-4 border-b capitalize">{pokemon.name}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="text-blue-600 underline"
                      onClick={() => fetchPokemonDetails(pokemon.url)}
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
                {selectedPokemon && selectedPokemon.name === pokemon.name && (
                  <tr className="bg-gray-50">
                    <td colSpan="3" className="py-4 px-4 border-b">
                      <div className="flex items-center space-x-4">
                        <img
                          src={selectedPokemon.sprites.front_default}
                          alt={selectedPokemon.name}
                          className="w-20 h-20"
                        />
                        <div>
                          <p><strong>Nombre:</strong> {selectedPokemon.name}</p>
                          <p><strong>Altura:</strong> {selectedPokemon.height}</p>
                          <p><strong>Peso:</strong> {selectedPokemon.weight}</p>
                          <p>
                            <strong>Tipos:</strong>{" "}
                            {selectedPokemon.types.map(t => t.type.name).join(", ")}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { Fragment } from 'react';
export default App;
