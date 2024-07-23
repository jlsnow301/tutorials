import React from "react";
import { useState } from "react";

type Props = {
  status: string;
};

export default function NewPage(props: Props) {
  const { status } = props;

  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(0)}>Click me</button>
      {count}
    </div>
  );
}
