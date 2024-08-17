import { apiHelper, apiHelper2, apiHelperWithToken } from "../helpers/apiHelper";

const driversEndpoints = {
  createDriver: async (data) => {
    try {
      const response = await apiHelper2.post('/taxis-controller/add-taxi', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateDriver: async (data) => {
    try {
      const response = await apiHelper.put('/radio-movil/edit', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDrivers: async () => {
    try {
      const response = await apiHelper2.get(`/taxis-controller/get-taxis?businessid=66b5eed6f78f582c9f2530a1`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteDriver: async (id) => {
    try {
      const response = await apiHelper.delete(`/radio-movil-admin/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default driversEndpoints;
