import React from "react";

type DetailedButton = React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { title: string }
>;

export const ButtonWrapper: DetailedButton = (props) => {
  const { title } = props;

  return <button {...props}>{title}</button>;
};
