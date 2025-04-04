import { useQuery, UseQueryResult } from "@tanstack/react-query";

import {
  ListClientService,
  Client,
} from "@/services/clients/ListClientService";

/**
 * React Query hook to list clients.
 */
export const useListClients = (): UseQueryResult<Client[], Error> => {
  return useQuery<Client[], Error>({
    queryKey: ["clients"],
    queryFn: ListClientService,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};
