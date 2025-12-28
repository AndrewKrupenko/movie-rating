import { useState, useEffect } from "react";

export function useFetch(fetchFunction, initialValue) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const result = await fetchFunction();
      if (!ignore) {
        setData(result);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [fetchFunction]);

  return { data, setData, isLoading };
}
