import { useState, useCallback } from "react";

export const useCounter = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((number) => number + 1);
  }, []);

  return { count, increment };
};
