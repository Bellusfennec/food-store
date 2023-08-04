import httpService from "./http.service";

const categoryEndPoint = "category/";

const categoryService = {
  getAll: async () => {
    const { data } = await httpService.get(categoryEndPoint);
    return data;
  },
  get: async (id) => {
    const { data } = await httpService.get(categoryEndPoint + id);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      categoryEndPoint + payload._id,
      payload
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      categoryEndPoint + payload._id,
      payload
    );
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(categoryEndPoint + id);
    return data;
  },
};

export default categoryService;
