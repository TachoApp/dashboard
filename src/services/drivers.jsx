import { apiHelper, apiHelperWithToken } from "../helpers/apiHelper";

const driversEndpoints = {
  createDriver: async (data) => {
    try {
      const response = await apiHelperWithToken.post('/driver', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateDriver: async (id, data) => {
    try {
      const response = await apiHelperWithToken.put(`/driver/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDrivers: async () => {
    try {
      const response = await apiHelperWithToken.get(`/driver`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteDriver: async (id) => {
    try {
      const response = await apiHelperWithToken.delete(`/driver/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default driversEndpoints;