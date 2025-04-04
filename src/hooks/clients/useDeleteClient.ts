import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import { DeleteClientService } from "@/services/clients/DeleteClientService";

/**
 * React Query hook to delete a client.
 */
export const useDeleteClient = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteClientService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error: Error) => {
      throw error;
    },
  });
};
