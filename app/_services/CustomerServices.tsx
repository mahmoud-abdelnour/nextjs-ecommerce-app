import requests from "./httpServices";

const CustomerServices = {
  loginCustomer: async (body: any) => {
    return requests.post("/customer/login", body);
  },

  verifyEmailAddress: async (body: any) => {
    return requests.post("/customer/verify-email", body);
  },
  verifyPhoneNumber: async (body: any) => {
    return requests.post("/customer/verify-phone", body);
  },

  registerCustomer: async (body: any) => {
    return requests.post(`/customer/register`, body);
  },

  signUpWithOauthProvider: async (body: any) => {
    return requests.post(`/customer/signup/oauth`, body);
  },

  signUpWithProvider(token: any, body: any) {
    return requests.post(`/customer/signup/${token}`, body);
  },

  forgetPassword: async (body: any) => {
    return requests.put("/customer/forget-password", body);
  },

  resetPassword: async (body: any) => {
    return requests.put("/customer/reset-password", body);
  },

  changePassword: async (body: any) => {
   return requests.post("/customer/change-password", body);
  },

  updateAddress: async (body: any) => {
   return requests.post("/customer/update-address", body);
  },

  updateCustomer: async (id: any, body: any) => {
    return requests.put(`/customer/${id}`, body);
  },

  getShippingAddress: async ({ userId = "" }) => {
    return requests.get(`/customer/shipping/address/${userId}`);
  },

  addShippingAddress: async ({ userId = "", shippingAddressData }: { userId?: string; shippingAddressData: any }) => {
    return requests.post(
      `customer/shipping/address/${userId}`,
      shippingAddressData
    );
  },
};

export default CustomerServices;
