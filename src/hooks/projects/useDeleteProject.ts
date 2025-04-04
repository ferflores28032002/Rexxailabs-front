import {
    useMutation,
    UseMutationResult,
    useQueryClient,
  } from "@tanstack/react-query";
  
  import { DeleteProjectService } from "@/services/projects/DeleteProjectService";
  
  /**
   * React Query hook to delete a project.
   */
  export const useDeleteProject = (): UseMutationResult<void, Error, number> => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: DeleteProjectService,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      },
      onError: (error: Error) => {
        throw error;
      },
    });
  };
  