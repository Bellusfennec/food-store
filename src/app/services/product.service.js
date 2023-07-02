import httpService from "./http.service";

const productEndPoint = "products";

const productService = {
  fetchAll: async () => {
    const { data } = await httpService.get(productEndPoint);
    return data;
  },
  get: async (id) => {
    const { data } = await httpService.get(productEndPoint + "?uuid=" + id);
    return data;
  },
  create: async (content) => {
    const { data } = await httpService.post(productEndPoint, content);
    return data;
  },
  update: async (id, content) => {
    const { data } = await httpService.put(productEndPoint + id, content);
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(productEndPoint + id);
    return data;
  },
  checkTitle: async (title) => {
    const { data } = await httpService.get(productEndPoint + "?title=" + title);
    return data;
  },
};

export default productService;
