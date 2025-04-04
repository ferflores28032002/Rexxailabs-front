import api from "../axiosInstance";

/**
 * Deletes a client by its ID.
 *
 * This service function sends a DELETE request to the API to remove a client
 * identified by the provided ID. It is designed to be used in a React Query hook.
 *
 * @param {number} id - The ID of the client to be deleted.
 * @returns {Promise<void>} A promise that resolves when the client is successfully deleted.
 * @throws {Error} If the deletion fails.
 */
export const DeleteClientService = async (id: number): Promise<void> => {
  try {
    await api.delete(`/clients/${id}`);
  } catch (error) {
    throw new Error(`Client deletion failed: ${(error as Error).message}`);
  }
};
