import axiosClient from "./axiosClient";

// api/productApi.js
const houseFApi = {
  // getAll: (params) => {
  //   const url = "/classes/RentHouse?include=CategoryId";
  //   return axiosClient.get(url, { params });
  // },
  getAll: () => {
    const url = "/classes/Room";
    return axiosClient.get(url);
  },
  get: (id)=>{
    const url=`/product/${id}`;
    return axiosClient.get(url);
  }
};

export default houseFApi;
