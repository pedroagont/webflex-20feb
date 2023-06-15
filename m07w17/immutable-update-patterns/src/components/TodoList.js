import { useState } from 'react';

function TodoList() {
  const initialTodos = ['learn html', 'learn css', 'learn js'];

  const [todos, setTodos] = useState(initialTodos);

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log('submit!');

    // console.log(event.target.todo.value);
    const newTodo = event.target.todo.value;

    // todos.push(newTodo);

    setTodos((prev) => [newTodo, ...prev]);

    event.target.reset();
  };

  return (
    <div>
      <h2>TodoList</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="todo" />
        <button>Add todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
