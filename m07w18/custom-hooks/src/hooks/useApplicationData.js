import { useState, useEffect } from 'react';

function useApplicationData() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';
      fetch(POKEAPI_URL)
        .then((res) => res.json())
        .then((data) => setPokemonData(data.results));
    }, 3000);
  }, []);

  return { pokemonData };
}

export default useApplicationData;
