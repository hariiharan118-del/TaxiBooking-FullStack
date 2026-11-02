import api from "./api";

const authService = {
  login: async (credentials) => {
    const response = await api.post("/users/login", credentials);
    return response.data;
  },

  register: async (user) => {
    const response = await api.post("/users/register", user);
    return response.data;
  },
};

export default authService;
