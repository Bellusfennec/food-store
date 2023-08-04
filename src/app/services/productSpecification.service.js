import httpService from "./http.service";

const productSpecificationEndPoint = "product_specification/";

const productSpecificationService = {
  getAll: async () => {
    const { data } = await httpService.get(productSpecificationEndPoint);
    return data;
  },
  get: async (id) => {
    const { data } = await httpService.get(productSpecificationEndPoint + id);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      productSpecificationEndPoint + payload._id,
      payload
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      productSpecificationEndPoint + payload._id,
      payload
    );
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(
      productSpecificationEndPoint + id
    );
    return data;
  },
};

export default productSpecificationService;
