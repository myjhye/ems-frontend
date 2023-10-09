import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';


// 전체 직원 조회
export const listEmployees = () => {
    return axios.get(REST_API_BASE_URL);
}



// 단일 직원 조회
export const getEmployees = (employeeId) => {
    return axios.get(REST_API_BASE_URL + '/' + employeeId);
}



// 직원 등록
export const createEmployee = (employee) => {
    return axios.post(REST_API_BASE_URL, employee);
}




// 직원 수정
export const updateEmployee = (employeeId, employee) => {
    return axios.put(REST_API_BASE_URL + '/' + employeeId, employee);
}




// 직원 삭제
export const deleteEmployee = (employeeId) => {
    return axios.delete(REST_API_BASE_URL + '/' + employeeId);
}