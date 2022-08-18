import axios from "axios";
import axiosClient from "./axiosClient";

const orderAPI = {
  createOrder: (fullName, email, phone, paymentMethod, room_id, totalPrice) => {
    const url = "/functions/order";
    return axiosClient.post(url, {
      fullName,
      email,
      phone,
      paymentMethod,
      room_id,
      totalPrice,
    });
  },

  //id of a house
  getOrder: (objectId) => {
    const url = `/classes/Order/?include=room_id.parent.CategoryId/room_id=${objectId}`;
    //localhost:1337/parse/classes/Order/?include=room_id.parent.CategoryId/room_id=kCQzQKzAps
    http: return axiosClient.get(url);
  },
};

export default orderAPI;
