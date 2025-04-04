import {
    useMutation,
    UseMutationResult,
    useQueryClient,
  } from "@tanstack/react-query";
  
  import { ApiError } from "@/services/auth/LoginService";
  
  import {
    CreateProjectService,
    ProjectPayload,
    ProjectResponse,
  } from "@/services/projects/CreateProjectService";
  
  /**
   * React Query hook to create a project.
   */
  export const useCreateProject = (): UseMutationResult<ProjectResponse, ApiError, ProjectPayload> => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: CreateProjectService,
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
  