import { useState } from 'react';

function Counter(props) {
  //   let count = 0;
  const [count, setCount] = useState(props.count || 0);

  const handleDecrement = () => setCount(count - 1);

  const handleIncrement = () => {
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);

    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <button onClick={handleDecrement}>Decrement</button>
      <h2>Counter: {count}</h2>
      <button onClick={handleIncrement}>Increment by 3</button>
    </div>
  );
}

export default Counter;
