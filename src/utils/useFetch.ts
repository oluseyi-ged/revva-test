import {useEffect, useState} from 'react';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setIsError(true);
        setError(err instanceof Error ? err.message : 'An error occured');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {data, isLoading, isError, error};
};

export default useFetch;
