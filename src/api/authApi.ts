import apiClient from "./apiClient";

export const authAPI = {
  login(credentials: { username: string; password: string }) {
    return apiClient.post("/auth/login", credentials);
  },

  logout() {
    return apiClient.get("/auth/logout");
  },

  getCurrentUser() {
    return apiClient.get("/auth/profile");
  },
};