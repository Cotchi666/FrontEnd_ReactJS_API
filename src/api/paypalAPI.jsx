import axios from "axios";
import axiosClient from "./axiosClient";

const paypalAPI = {
  getPayPal: () => {
    const url = "/functions/PAYPAL";
    return axiosClient.post(url);
  },
  putPayPal: (objectId) => {
    const url = `/functions/payment?objectId=${objectId}`;
    return axiosClient.post(url);
  },
};

export default paypalAPI;
