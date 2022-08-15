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
  create: (username, password)=>{
    const url = "/functions/create-new-user"
    return axiosClient.post(url, {username, password})
  },
  login: (username, password)=>{
    const url = "/functions/login"
    return axiosClient.post(url, {username, password})
  },
  test: (name, phone,room_id)=>{
    const url = "/functions/order"
    return axiosClient.post(url, {name, phone, room_id})
  },
};

export default houseApi;
