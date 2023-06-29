import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters
} from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type UseTanstackFn = <T>(
  key: string,
  url: string
) => {
  data: T;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
};

const useTanstack: UseTanstackFn = (key, url) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data: axiosData } = await axios.get(url);
      return axiosData;
    }
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch
  };
};

export default useTanstack;
