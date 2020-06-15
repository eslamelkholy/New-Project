import axiosinstance from './axiosInstance';
import Axios from 'axios';

export default{
    login: user =>{
        return Axios.post("api/auth/login", user).then(res => res.data).catch(err => err)
    },
    register: user =>{
        return Axios.post("api/auth/register", user).then(res => res.data)
    },
    logout:()=>{
        localStorage.removeItem("token");
    },
    isAuthenticated:()=>{
        return axiosinstance.get("api/auth/user")
        .then(res => res.data)
        .catch(err => {
            return {isAuthenticated: false, user: {username: ""}}
        })
    }
}