import { apiHelper, apiHelperWithToken } from "../helpers/apiHelper";

const walletEndpoints = {
  getWallet: async () => {
    try {
      const response = await apiHelperWithToken.get(`/wallet/business`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default walletEndpoints;
