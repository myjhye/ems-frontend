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




// 로컬 스토리지에 토큰 저장
export const storeToken = (token) => {
    
    localStorage.setItem("token", token);
}




// 로컬 스토리지에서 토큰 읽어오기
export const getToken = () => {

    return localStorage.getItem("token");
}





// 세션 스토리지에 로그인한 유저 저장 -> 로그인 유지
export const saveLoggedInUser = (username) => {

    sessionStorage.setItem("authenticatedUser", username);
}



// 유저가 로그인 중인지 여부 확인
export const isUserLoggedIn = () => {

    const username = sessionStorage.getItem("authenticatedUser");

    if (username == null) {
        return false;
    } else {
        return true;
    }
}



// 세션 스토리지에서 로그인한 유저 읽어오기
export const getLoggedInUser = () => {

    const username = sessionStorage.getItem("authenticatedUser");

    return username;
}





// 로그아웃
export const logout = () => {

    localStorage.clear();
    sessionStorage.clear();
}