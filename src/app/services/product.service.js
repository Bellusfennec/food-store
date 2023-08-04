import httpService from "./http.service";

const productEndPoint = "product/";

const productService = {
  getAll: async () => {
    const { data } = await httpService.get(productEndPoint);
    return data;
  },
  get: async (id) => {
    const { data } = await httpService.get(productEndPoint + id);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      productEndPoint + payload._id,
      payload
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      productEndPoint + payload._id,
      payload
    );
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(productEndPoint + id);
    return data;
  },
};

export default productService;
