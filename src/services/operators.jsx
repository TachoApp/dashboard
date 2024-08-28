import { apiHelper, apiHelperWithToken } from "../helpers/apiHelper";

const operatorsEndpoints = {
  createOperator: async (data) => {
    try {
      const response = await apiHelperWithToken.post('/operator', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateOperator: async (id, data) => {
    try {
      const response = await apiHelperWithToken.put(`/operator/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOperators: async () => {
    try {
      const response = await apiHelperWithToken.get(`/operator`);
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

export default operatorsEndpoints;
