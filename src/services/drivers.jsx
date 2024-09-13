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

  getDrivers: async ({ page = 1, size = 100, filter = '' }) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        filter: filter
      });
      const response = await apiHelperWithToken.get(`/driver?${queryParams.toString()}`);
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

  createDriversStops: async (data) => {
    try {
      const response = await apiHelperWithToken.post('/driver/stops', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getDriversStops: async () => {
    try {
      const response = await apiHelperWithToken.get('/driver/stops');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateDriversStop: async (id, data) => {
    try {
      const response = await apiHelperWithToken.put(`/driver/stops/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteDriversStop: async (id) => {
    try {
      const response = await apiHelperWithToken.delete(`/driver/stops/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  toggleDriverStatus: async (id) => {
    try {
      const response = await apiHelperWithToken.post(`/driver/status/activate`, { driverId: id });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default driversEndpoints;
