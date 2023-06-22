import Header from './Header';
import Counter from './Counter';
import PokemonList from './PokemonList';

import useCounter from '../hooks/useCounter';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useApplicationData from '../hooks/useApplicationData';

import '../styles/App.css';

function App() {
  const { count, handleDecrement, handleIncrement } = useCounter(100);
  const { pokemonData } = useApplicationData();

  useDocumentTitle(`Counter at ${count}`);

  return (
    <>
      <Header count={count} />
      <Counter
        count={count}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
      />
      <PokemonList pokemonData={pokemonData} />
    </>
  );
}

export default App;
