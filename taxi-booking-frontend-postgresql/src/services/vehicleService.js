import api from "./api";

const vehicleService = {
  getVehicles: async () => {
    const response = await api.get("/vehicles");
    return response.data;
  },

  addVehicle: async (vehicle) => {
    const response = await api.post("/vehicles", vehicle);
    return response.data;
  },
};

export default vehicleService;
