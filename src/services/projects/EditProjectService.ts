import api from "../axiosInstance";

export type ProjectPayload = Partial<{
  name: string;
  description: string;
  status: string;
  startDate: string;
  deliveryDate: string;
  clientId: number;
}>;

export type ProjectResponse = {
  message: string;
  project?: {
    id: number;
    name: string;
    description: string;
    status: string;
    startDate: string;
    deliveryDate: string;
    clientId: number;
    createdAt: string;
    updatedAt: string;
  };
};

/**
 * Sends a PUT request to update a project with the provided payload.
 * 
 * @param id - The ID of the project to update.
 * @param payload - Partial project data to update.
 * @returns A promise resolving to the updated project response.
 */
export const EditProjectService = async (id: number,payload: ProjectPayload): Promise<ProjectResponse> => {
  const response = await api.put<ProjectResponse>(`/projects/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};
