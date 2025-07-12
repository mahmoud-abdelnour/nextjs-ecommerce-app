import requests from "./httpServices";

const CategoryService = {
  getShowingCategory: async () => {
    return requests.get("/category/show");
  },
};

export default CategoryService;
