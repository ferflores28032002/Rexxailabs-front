import { useQuery, UseQueryResult } from "@tanstack/react-query";

import {
  ListProjectService,
  Project,
} from "@/services/projects/ListProjectService";

/**
 * React Query hook to list projects.
 */
export const useListProjects = (): UseQueryResult<Project[], Error> => {
  return useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: ListProjectService,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};
