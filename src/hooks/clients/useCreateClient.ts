import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import { ApiError } from "@/services/auth/LoginService";

import {
  CreateClientService,
  ClientPayload,
  ClientResponse,
} from "@/services/clients/CreateClientService";

/**
 * React Query hook to create a client.
 */
export const useCreateClient = (): UseMutationResult<ClientResponse, ApiError, ClientPayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateClientService,
    onSuccess: (data) => {
      if (data.client) {
        queryClient.invalidateQueries({ queryKey: ["clients"] });
      }
    },
    onError: (error: ApiError) => {
      throw error;
    },
  });
};
