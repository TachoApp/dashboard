import { apiHelper } from "../helpers/apiHelper";

const authEndpoints = {
      loginAdm: async (data) => {
        try {
          const response = await apiHelper.post('/auth/admins', data);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
  };
  
export default authEndpoints;