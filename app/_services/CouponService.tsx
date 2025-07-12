import requests from "./httpServices";

const CouponService = {
  getAllCoupons: async () => {
    return requests.get("/coupon");
  },
  getShowingCoupons: async () => {
    return requests.get("/coupon/show");
  },
};

export default CouponService;
