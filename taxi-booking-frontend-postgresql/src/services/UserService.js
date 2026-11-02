import api from "./api";

const userService = {
  getUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  updateUser: async (id, user) => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },
};

export default userService;
