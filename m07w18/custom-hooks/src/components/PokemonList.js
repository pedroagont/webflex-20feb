function PokemonList(props) {
  const { pokemonData } = props;

  if (pokemonData.length === 0) {
    return <h2>Loading pokemon data... 🐰</h2>;
  }

  return (
    <div>
      <h2>Pokemon list! 🐰</h2>
      <ul>
        {pokemonData.map((poke) => (
          <li key={poke.name}>{poke.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;
