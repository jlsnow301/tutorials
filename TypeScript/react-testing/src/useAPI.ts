import { useEffect, useState } from "react";

type Data = Record<string, string>;

export const useAPI = () => {
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

  return data;
};
