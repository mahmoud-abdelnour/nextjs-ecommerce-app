import { AxiosRequestConfig } from "axios";
import requests from "./httpServices";

const OrderServices = {
  addOrder: async (body: any, headers: {} | AxiosRequestConfig<any> | undefined) => {
    return requests.post("/order/add", body, headers);
  },

  createPaymentIntent: async (body: any) => {
    return requests.post("/order/create-payment-intent", body);
  },

  addRazorpayOrder: async (body: any) => {
    return requests.post("/order/add/razorpay", body);
  },

  createOrderByRazorPay: async (body: any) => {
    return requests.post("/order/create/razorpay", body);
  },

  getOrderCustomer: async ({ page = 1, limit = 8 }) => {
    return requests.get(`/order?limit=${limit}&page=${page}`);
  },
  getOrderById: async (id: any, body: {} | AxiosRequestConfig<any> | undefined) => {
    return requests.get(`/order/${id}`, body);
  },

  //for sending email invoice to customer
  sendEmailInvoiceToCustomer: async (body: any) => {
    return requests.post("/order/customer/invoice", body);
  },
};

export default OrderServices;
