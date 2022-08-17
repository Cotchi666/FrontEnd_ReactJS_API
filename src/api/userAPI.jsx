import axiosClient from "./axiosClient";

const userAPI = {
  create: (username, password, email) => {
    const url = "/functions/create-new-user";
    return axiosClient.post(url, { username, password, email });
  },
  login: (email, password) => {
    const url = "/functions/login";
    return axiosClient.post(url, { email, password });
  },
  createOrder: (name, phone, room_id) => {
    const url = "/functions/order";
    return axiosClient.post(url, { name, phone, room_id });
  },
};

export default userAPI;
