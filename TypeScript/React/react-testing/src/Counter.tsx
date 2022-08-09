import React, { useState } from "react";

type Props = {};

export const Counter: React.FC<Props> = (props) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>Add One</button>
      <div role="contentinfo">Count is {count}</div>
    </div>
  );
};
