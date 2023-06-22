function Counter(props) {
  const { count, handleDecrement, handleIncrement } = props;
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={handleDecrement}>Decrement (-)</button>
      <button onClick={handleIncrement}>Increment (+)</button>
    </div>
  );
}

export default Counter;
