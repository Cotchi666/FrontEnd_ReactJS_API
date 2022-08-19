import axios from "axios";
import axiosClient from "./axiosClient";

const orderAPI = {
  createOrder: (fullName, email, phone, paymentMethod, room_id, user_id) => {
    const url = "/functions/order";
    return axiosClient.post(url, {
      fullName,
      email,
      phone,
      paymentMethod,
      room_id,
      user_id,
    });
  },

  //id of a house
  getOrder: (objectId) => {
    const url = `/functions/get-order?room_id=${objectId}`;
    return axiosClient.post(url);
  },
};

export default orderAPI;
