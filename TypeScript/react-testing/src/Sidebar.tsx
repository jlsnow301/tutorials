import React from "react";

type Props = {
  items: ReadonlyArray<Item>;
};

type Item = {
  name: string;
  href: string;
};

export const Sidebar: React.FC<Props> = (props) => {
  const { items = [] } = props;

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <a href={item.href} role="navigation">
            {item.name}
          </a>
        </div>
      ))}
    </div>
  );
};
