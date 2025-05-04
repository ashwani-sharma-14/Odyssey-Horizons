import axios from "axios";

const API_URL = "https://odyssey-horizons.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const packageApi = {
  getAll: () => api.get("/packages"),
  getById: (id) => api.get(`/packages/${id}`),
  create: (data) => api.post("/packages", data),
  update: (id, data) => api.put(`/packages/${id}`, data),
  delete: (id) => api.delete(`/packages/${id}`),
};

export const queryApi = {
  create: (data) => api.post("/queries", data),
  getAll: () => api.get("/queries"),
  updateStatus: (id, status) => api.patch(`/queries/${id}/status`, { status }),
};
