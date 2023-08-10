import httpService from "./http.service";

const userEndPoint = "user/";

const userService = {
  getAll: async () => {
    const { data } = await httpService.get(userEndPoint);
    return data;
  },
  get: async (id) => {
    const { data } = await httpService.get(userEndPoint + id);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndPoint + payload._id, payload);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      userEndPoint + payload._id,
      payload
    );
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(userEndPoint + id);
    return data;
  },
};
export default userService;
