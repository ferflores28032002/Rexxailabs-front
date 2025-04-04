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
  user: User;
  projects: Project[];
};

/**
 * Fetches a list of clients from the API.
 *
 * This service function makes an HTTP GET request to the "/clients" endpoint
 * to retrieve an array of clients. It is designed to be used in conjunction
 * with React Query hooks or similar for data management.
 *
 * @returns {Promise<Client[]>} A promise that resolves to an array of Client objects.
 */
export const ListClientService = async (): Promise<Client[]> => {
  const response = await api.get<Client[]>("/clients");
  return response.data;
};
