import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/departments';


// 부서 조회 -> 전체
export const listDepartments = () => {
    return axios.get(REST_API_BASE_URL);
}



// 부서 조회 -> 단일
export const getDepartments = (departmentId) => {
    return axios.get(REST_API_BASE_URL + '/' + departmentId);
}




// 부서 등록
export const createDepartment = (department) => {
    return axios.post(REST_API_BASE_URL, department);
}



// 부서 수정
export const updateDepartment = (departmentId, department) => {
    return axios.put(REST_API_BASE_URL + '/' + departmentId, department);
}



// 부서 삭제
export const deleteDepartment = (departmentId) => {
    return axios.delete(REST_API_BASE_URL + '/' + departmentId);
}