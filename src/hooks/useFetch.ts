import { useState, useEffect } from "react";

type UseFetchReturn<T> = {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  isLoading: boolean;
};

export function useFetch<T>(
  fetchFunction: () => Promise<T>,
  initialValue: T,
): UseFetchReturn<T> {
  const [data, setData] = useState<T>(initialValue);
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

  return {
    data,
    setData,
    isLoading,
  };
}
