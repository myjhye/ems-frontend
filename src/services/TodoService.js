import axios from "axios";

const BASE_REST_API_URL = 'http://localhost:8080/api/todos';


// 투두 조회 -> 전체
export function getAllTodos() {

    return axios.get(BASE_REST_API_URL);
}



// 투두 조회 -> 단일
export function getTodo(todoId) {

    return axios.get(BASE_REST_API_URL + '/' + todoId);
}


// 투두 등록
export function addTodo(todo) {

    return axios.post(BASE_REST_API_URL, todo);
}


// 투두 수정
export function updateTodo(TodoId, todo) {

    return axios.put(BASE_REST_API_URL + '/' + TodoId, todo);
}


// 투두 삭제
export function deleteTodo(todoId) {

    return axios.delete(BASE_REST_API_URL + '/' + todoId);
}



// 투두 완료
export function completeTodo(todoId) {
    return axios.patch(BASE_REST_API_URL + '/' + todoId + '/complete');
} 



// 투두 미완료
export function incompleteTodo(todoId) {
    return axios.patch(BASE_REST_API_URL + '/' + todoId + '/incomplete');
} 