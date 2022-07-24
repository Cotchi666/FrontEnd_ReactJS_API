import axios from "../axios";


const handleLoginAPI = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });

}
const getAllUsers = (inputId) => {
    //template string (`   `)
    return axios.get(`/api/get-all-users?id=${inputId}`);


}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);

}
const createNewUserService = (data) => {
    console.log('check data from service:', data)
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}
// const editUserService =(inputData)=>{
//     return axios.put('/api/edit-user',{
//         data:{
//             id:inputData
//         }
//     })
// }
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

export { handleLoginAPI, getAllUsers, createNewUserService, deleteUserService, editUserService ,getAllCodeService,getTopDoctorHomeService}