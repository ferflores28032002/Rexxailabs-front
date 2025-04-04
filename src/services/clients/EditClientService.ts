import api from "../axiosInstance";

import { ClientResponse } from "./CreateClientService";

export type ClientPayload = Partial<{
  name: string;
  email: string;
  phone: string;
  image: File | null;
}>;

const isValidValue = (value: unknown): value is string | File =>
  value !== undefined && value !== null;

/**
 * Constructs a FormData object from a given payload.
 * @param payload - The client data to be sent.
 * @returns A FormData instance containing the valid fields.
 */
const createFormData = (payload: ClientPayload): FormData => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (isValidValue(value)) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });

  return formData;
};

/**
 * Sends a PUT request to update a client with the provided payload.
 * @param id - The ID of the client to update.
 * @param payload - The data fields to update.
 * @returns A promise resolving to the updated client response.
 */
export const EditClientService = async (id: number, payload: ClientPayload): Promise<ClientResponse> => {
  const formData = createFormData(payload);

  const response = await api.put<ClientResponse>(`/clients/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
