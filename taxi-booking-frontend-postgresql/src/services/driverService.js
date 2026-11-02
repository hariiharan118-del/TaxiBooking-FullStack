import api from "./api";

const driverService = {
  getDrivers: async () => {
    const response = await api.get("/drivers");
    return response.data;
  },

  addDriver: async (driver) => {
    const response = await api.post("/drivers", driver);
    return response.data;
  },
};

export default driverService;
