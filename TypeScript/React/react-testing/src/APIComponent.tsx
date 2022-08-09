import React, { useEffect, useState } from "react";

type Props = {};

type Data = {
  name: string;
};

export const APIComponent: React.FC<Props> = () => {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    let isMounted = true;
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setData(data);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return <div>{data && <div role="term">Name is {data.name}</div>}</div>;
};
