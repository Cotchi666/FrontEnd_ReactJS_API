import axiosClient from "./axiosClient";


const userAPI = {
  create: (username, password)=>{
    const url = "/functions/create-new-user"
    return axiosClient.post(url, {username, password})
  },
  login: (email, password)=>{
    const url = "/functions/login"
    return axiosClient.post(url, {email, password})
  },
  test: (name, phone,room_id)=>{
    const url = "/functions/order"
    return axiosClient.post(url, {name, phone, room_id})
  },
};

export default userAPI;
