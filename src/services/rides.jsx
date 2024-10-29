import { apiHelper, apiHelperWithToken } from "../helpers/apiHelper";

const ridesEndpoints = {
  createManualRide: async (data) => {
    try {
      const response = await apiHelperWithToken.post('/rides/manual', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRides: async (size, page) => {
    try {
      const response = await apiHelperWithToken.get(`/rides/business?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteOperator: async (id) => {
    try {
      const response = await apiHelperWithToken.delete(`/operator/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ridesEndpoints;
