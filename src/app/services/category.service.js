import httpService from "./http.service";

const categoryEndPoint = "categories";

const categoryService = {
  fetchAll: async () => {
    const { data } = await httpService.get(categoryEndPoint);
    return data;
  },
  get: async (id) => {
    const { data } = await httpService.get(categoryEndPoint + "?id=" + id);
    return data;
  },
  create: async (content) => {
    const { data } = await httpService.post(categoryEndPoint, content);
    return data;
  },
  update: async (id, content) => {
    const { data } = await httpService.put(categoryEndPoint + id, content);
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(categoryEndPoint + id);
    return data;
  },
  checkTitle: async (title) => {
    const { data } = await httpService.get(
      categoryEndPoint + "?title=" + title
    );
    return data;
  },
};

export default categoryService;
