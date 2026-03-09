import { api } from "./api";

export const facultyService = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/faculty${query ? `?${query}` : ""}`);
  },
  getById: (id) => api.get(`/faculty/${id}`),
  create: (data) => api.post("/faculty", data),
  update: (id, data) => api.put(`/faculty/${id}`, data),
  remove: (id) => api.delete(`/faculty/${id}`),
};
