import { useState } from 'react';

function useCounter(initialCount) {
  const [count, setCount] = useState(initialCount || 0);

  const handleDecrement = () => {
    setCount((prevState) => prevState - 1);
  };
  const handleIncrement = () => {
    setCount((prevState) => prevState + 1);
  };

  return { count, handleDecrement, handleIncrement };
}

export default useCounter;
