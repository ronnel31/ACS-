import { api } from "./api";

export const researchService = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/research${query ? `?${query}` : ""}`);
  },
  getById: (id) => api.get(`/research/${id}`),
  create: (data) => api.post("/research", data),
  update: (id, data) => api.put(`/research/${id}`, data),
  remove: (id) => api.delete(`/research/${id}`),
};
