import axios from "axios";

const BASE_REST_API_URL = 'http://localhost:8080/api/todos';


// 투두 조회 -> 전체
export function getAllTodos() {

    return axios.get(BASE_REST_API_URL);
}


// 투두 등록