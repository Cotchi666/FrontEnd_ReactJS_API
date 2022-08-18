import axios from "axios";
import axiosClient from "./axiosClient";

const paypalAPI = {
  getPayPal: () => {
    const url = "/functions/PAYPAL";
    return axiosClient.post(url);
  },
  putPayPal: () => {
    const url = "/functions/payment";
    return axiosClient.post(url);
  },
};

export default paypalAPI;
