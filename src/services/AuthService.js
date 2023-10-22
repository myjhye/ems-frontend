import axios from "axios";

const AUTH_REST_API_BASE_URL = 'http://localhost:8080/api/auth';



// 회원가입
export const registerAPICall = (registerObj) => {

    return axios.post(AUTH_REST_API_BASE_URL + '/register', registerObj);
}



// 로그인
export const loginAPICall = (usernameOrEmail, password) => {

    const data = {
        usernameOrEmail: usernameOrEmail,
        password: password
    };

    return axios.post(AUTH_REST_API_BASE_URL + '/login', data);
}



export const storeToken = (token) => {
    
    localStorage.setItem("token", token);
}


export const getToken = () => {

    return localStorage.getItem("token");
}