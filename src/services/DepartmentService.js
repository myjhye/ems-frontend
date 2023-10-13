import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/departments';


// 전체 직원 조회
export const listDepartments = () => {
    return axios.get(REST_API_BASE_URL);
}
