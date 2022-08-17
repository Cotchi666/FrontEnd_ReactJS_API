import axiosClient from "./axiosClient";

const orderAPI = {
  createOrder: (fullName, email, phone, room_id) => {
    const url = "/functions/order";
    return axiosClient.post(url, {
      fullName,
      email,
      phone,
      room_id,
    });
  },
};

export default orderAPI;
