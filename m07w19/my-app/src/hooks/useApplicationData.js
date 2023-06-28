import { useEffect, useState } from 'react';

function useApplicationData() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCatchPokemon = (event) => {
    event.preventDefault();

    setLoading(true);

    const pokemonInput = event.target.pokemonName.value;

    setTimeout(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`)
        .then((res) => res.json())
        .then((data) => setPokemon(data))
        .then(() => setLoading(false));
    }, 2000);
  };

  useEffect(() => {
    document.title = pokemon ? `Catching ${pokemon.name}` : 'My pokedex!';
  }, [pokemon]);

  return { pokemon, loading, handleCatchPokemon };
}

export default useApplicationData;
