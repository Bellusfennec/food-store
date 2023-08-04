import httpService from "./http.service";

const specificationEndPoint = "specification/";

const specificationService = {
  getAll: async () => {
    const { data } = await httpService.get(specificationEndPoint);
    return data;
  },
  get: async (id) => {
    const { data } = await httpService.get(specificationEndPoint + id);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      specificationEndPoint + payload._id,
      payload
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      specificationEndPoint + payload._id,
      payload
    );
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(specificationEndPoint + id);
    return data;
  },
};

export default specificationService;
