import { useQuery } from "@tanstack/react-query";
import genres from "../data/genres";
import ms from 'ms';
import { FetchResponse } from "../services/api-client";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Genre>('/genres');

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () =>
  useQuery({
    queryKey: ['genres'],
    queryFn: apiClient.getAll,
    staleTime: ms('24h'), 
    initialData: genres
  });

export default useGenres;
