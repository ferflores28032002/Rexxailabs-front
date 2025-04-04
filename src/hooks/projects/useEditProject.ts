import {
    useMutation,
    UseMutationResult,
    useQueryClient,
  } from "@tanstack/react-query";
  
  import { EditProjectService, ProjectPayload } from "@/services/projects/EditProjectService";
  import { ProjectResponse } from "@/services/projects/CreateProjectService";
  import { ApiError } from "@/services/auth/LoginService";
  
  /**
   * React Query hook to edit a project.
   */
export const useEditProject = (): UseMutationResult<ProjectResponse, ApiError,{ id: number; payload: ProjectPayload }> => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, payload }) => EditProjectService(id, payload),
      onSuccess: (data) => {
        if (data.project) {
          queryClient.invalidateQueries({ queryKey: ["projects"] });
        }
      },
      onError: (error: ApiError) => {
        throw error;
      },
    });
  };
  