import { api } from "./api";

export const curriculumService = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/curriculum${query ? `?${query}` : ""}`);
  },
  getById: (id) => api.get(`/curriculum/${id}`),
  create: (data) => api.post("/curriculum", data),
  update: (id, data) => api.put(`/curriculum/${id}`, data),
  remove: (id) => api.delete(`/curriculum/${id}`),
};
