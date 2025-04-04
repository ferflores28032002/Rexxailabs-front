import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import { ClientResponse } from "@/services/clients/CreateClientService";
import {
  EditClientService,
  ClientPayload,
} from "@/services/clients/EditClientService";

import { ApiError } from "@/services/auth/LoginService";

/**
 * React Query hook to edit a client.
 */
export const useEditClient = (): UseMutationResult<ClientResponse, ApiError, { id: number; payload: ClientPayload }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => EditClientService(id, payload),
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
