import api from "../axiosInstance";

/**
 * Deletes a project by its ID.
 *
 * This service function sends a DELETE request to the API to remove a project
 * identified by the provided ID. It is designed to be used in a React Query hook.
 *
 * @param {number} id - The ID of the project to be deleted.
 * @returns {Promise<void>} A promise that resolves when the project is successfully deleted.
 * @throws {Error} If the deletion fails.
 */
export const DeleteProjectService = async (id: number): Promise<void> => {
  try {
    await api.delete(`/projects/${id}`);
  } catch (error) {
    throw new Error(`Project deletion failed: ${(error as Error).message}`);
  }
};
