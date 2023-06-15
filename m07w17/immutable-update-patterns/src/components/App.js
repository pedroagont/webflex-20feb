import '../styles/App.css';
import Header from './Header';
import Counter from './Counter';
import TodoList from './TodoList';

function App() {
  return (
    <>
      <Header title="Hello from react!" />
      <Counter count={10} />
      <TodoList />
    </>
  );
}

export default App;
