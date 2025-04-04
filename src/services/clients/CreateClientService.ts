import api from "../axiosInstance";

export type ClientPayload = {
  name: string;
  email: string;
  phone: string;
  image: File | null;
};

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

export type ClientResponse = {
  message: string;
  client?: Client;
};

/**
 * Service to create a new client.
 * 
 * Sends a POST request to the "/clients" endpoint using multipart/form-data
 * with the fields: name, email, phone and image.
 * 
 * @param payload - The form data to create the client.
 * @returns A promise resolving to the response with the created client.
 */
export const CreateClientService = async (payload: ClientPayload): Promise<ClientResponse> => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("phone", payload.phone);

  if (!payload.image) {
    throw new Error("Image is required");
  }
  formData.append("image", payload.image);

  const response = await api.post<ClientResponse>("/clients", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
