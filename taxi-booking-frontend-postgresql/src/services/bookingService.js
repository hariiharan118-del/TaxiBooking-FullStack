import api from "./api";

const bookingService = {
  getBookings: async () => {
    const response = await api.get("/bookings");
    return response.data;
  },

  getCustomerBookings: async (email) => {
    const response = await api.get(
      `/bookings/customer?email=${encodeURIComponent(email)}`,
    );
    return response.data;
  },

  createBooking: async (booking) => {
    const response = await api.post("/bookings", booking);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.put(`/bookings/${id}/status`, { status });
    return response.data;
  },

  assignDriver: async (id, driverName) => {
    const response = await api.put(`/bookings/${id}/assign`, { driverName });
    return response.data;
  },
};

export default bookingService;
