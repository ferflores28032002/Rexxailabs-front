import api from "../axiosInstance";

export type ProjectPayload = {
  name: string;
  description: string;
  status: string;
  startDate: string;
  deliveryDate: string;
  clientId: number;
};

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
 * Service to create a new project.
 * 
 * Sends a POST request to the "/projects" endpoint using JSON data.
 * 
 * @param payload - The form data to create the project.
 * @returns A promise resolving to the response with the created project.
 */
export const CreateProjectService = async (payload: ProjectPayload): Promise<ProjectResponse> => {
  const response = await api.post<ProjectResponse>("/projects", payload);
  return response.data;
};
