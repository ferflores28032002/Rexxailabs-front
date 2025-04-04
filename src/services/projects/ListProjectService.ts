import api from "../axiosInstance";

export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  status: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  userId: number;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  status: string;
  startDate: string;
  deliveryDate: string;
  clientId: number;
  createdAt: string;
  updatedAt: string;
  client: Client;
};

/**
 * Fetches a list of projects from the API.
 *
 * This service function makes an HTTP GET request to the "/projects" endpoint
 * to retrieve an array of projects with their associated client info.
 *
 * @returns {Promise<Project[]>} A promise that resolves to an array of Project objects.
 */
export const ListProjectService = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>("/projects");
  return response.data;
};
