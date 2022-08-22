import axiosClient from "./axiosClient";

// api/productApi.js
const houseApi = {
  // getAll: (params) => {
  //   const url = "/classes/RentHouse?include=CategoryId";
  //   return axiosClient.get(url, { params });
  // },
  getAll: () => {
    const url = "/classes/RentHouse?include=CategoryId";
    return axiosClient.get(url);
  },
  get: (id) => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
  getRoomById: (objectId) => {
    const url = `/classes/Room/${objectId}/?include=parent.CategoryId`;

    return axiosClient.get(url);
  },
  getAllRoom: () => {
    const url = "/classes/Room?include=parent.CategoryId";
    return axiosClient.get(url);
  },
  getCate: () => {
    const url = "/classes/Category";
    return axiosClient.get(url);
  },
  
};

export default houseApi;
