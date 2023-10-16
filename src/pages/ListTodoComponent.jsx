import { useEffect, useState } from "react"
import { deleteTodo, getAllTodos } from "../services/TodoService";
import { useNavigate } from "react-router-dom";

export default function ListTodoComponent() {

    const [todos, setTodos] = useState([]);

    const navigate = useNavigate();


    // 초기 렌더링 화면 -> 전체 투두 목록 조회
    useEffect(() => {

        listTodos();
    }, []);



    // 투두 목록 조회 핸들러
    function listTodos() {
        
        getAllTodos()
            .then((res) => {
                setTodos(res.data);
            })
            .catch(error => {
                console.error(error);
            })
    }




    // 투두 삭제 핸들러
    function removeTodo(id) {

        if (window.confirm('삭제하시겠습니까?')) {

            deleteTodo(id)
                .then((res) => {
                    console.log(res.data);
                    listTodos();
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }




    return (
        <div className="container">
            <h2 className="text-center mt-5 mb-3">일정 리스트</h2>
            <button 
                className="btn btn-primary mb-3"
                onClick={() => navigate('/add-todo')}
            >
                일정 등록
            </button>
            <div>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>일정 제목</th>
                            <th>일정 상세</th>
                            <th>완료 여부</th>
                            <th style={{ width: "200px" }}>기능</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo) => (
                                <tr key={todo.id}>
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.completed ? 'y' : 'n'}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => navigate(`/update-todo/${todo.id}`)}>수정</button>
                                        <button 
                                            className="btn btn-danger"
                                            style={{marginLeft: '5px'}}  
                                            onClick={() => removeTodo(todo.id)} 
                                        >
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}