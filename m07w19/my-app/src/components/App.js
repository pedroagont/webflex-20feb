import '../styles/App.css';
import Header from './Header';
import Pokedex from './Pokedex';
import useApplicationData from '../hooks/useApplicationData';

function App() {
  const { pokemon, loading, handleCatchPokemon } = useApplicationData();

  return (
    <>
      <Header title="Welcome to my pokedex!" emoji="🐰" />
      <Pokedex
        pokemon={pokemon}
        loading={loading}
        handleCatchPokemon={handleCatchPokemon}
      />
    </>
  );
}

export default App;
