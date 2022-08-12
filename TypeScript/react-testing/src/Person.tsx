import React from "react";

type Props = {
  name: string;
};

export const Person: React.FC<Props> = (props) => {
  const { name } = props;

  return <div role="contentinfo">Name is {name}</div>;
};
