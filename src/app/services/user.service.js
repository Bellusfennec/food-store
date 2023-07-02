import httpService from "./http.service";

const userEndPoint = "users";

const userService = {
  fetchAll: async () => {
    const { data } = await httpService.get(userEndPoint);
    return data;
  },
  get: async (id) => {
    const { data } = await httpService.get(userEndPoint + "?uuid=" + id);
    return data;
  },
  create: async (content) => {
    const { data } = await httpService.post(userEndPoint, content);
    return data;
  },
  update: async (id, content) => {
    const { data } = await httpService.put(userEndPoint + "/" + id, content);
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(userEndPoint + "/" + id);
    return data;
  },
  checkEmail: async (email) => {
    const { data } = await httpService.get(userEndPoint + "?email=" + email);
    return data;
  },
  login: async (email, password) => {
    const { data } = await httpService.get(
      userEndPoint + "?email=" + email + "&password=" + password
    );
    return data;
  },
};
export default userService;
