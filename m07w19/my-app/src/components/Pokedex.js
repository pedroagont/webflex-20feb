const pokeballImg =
  'https://www.clipartmax.com/png/small/129-1298464_open-pokeball-download-open-pokeball.png';

function Pokedex(props) {
  const { pokemon, loading, handleCatchPokemon } = props;

  return (
    <>
      <form className="pokedex-form" onSubmit={handleCatchPokemon}>
        <input type="text" name="pokemonName" />
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
      </form>

      {loading ? (
        <div className="pokedex-results">
          <img
            src="https://cdn.dribbble.com/users/1081076/screenshots/2832850/pokemongo.gif"
            alt="pokemon"
            width="100px"
          />
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="pokedex-results">
          <img
            src={pokemon ? pokemon.sprites.front_default : pokeballImg}
            alt="pokemon"
            width="100px"
          />
          <h2>{pokemon ? pokemon.name : 'Catch them all!'}</h2>
        </div>
      )}
    </>
  );
}

export default Pokedex;
