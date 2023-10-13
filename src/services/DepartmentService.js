import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/departments';


// 전체 부서 조회
export const listDepartments = () => {
    return axios.get(REST_API_BASE_URL);
}

// 부서 등록
export const createDepartment = (department) => {
    return axios.post(REST_API_BASE_URL, department);
}
