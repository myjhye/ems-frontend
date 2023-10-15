import { useState } from "react"

export default function ListTodoComponent() {

   

    const data = [
        {
            "id": 1,
            "title": "제목1",
            "description": "내용1",
            "completed": false
        },
        {
            "id": 2,
            "title": "제목2",
            "description": "내용2",
            "completed": true
        },
        {
            "id": 3,
            "title": "제목3",
            "description": "내용3",
            "completed": false
        }
    ]

    const [todos, setTodos] = useState(data);

    return (
        <div className="container">
            <h2 className="text-center">일정 리스트</h2>
            <div>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>일정 제목</th>
                            <th>일정 상세</th>
                            <th>완료 여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo) => (
                                <tr key={todo.id}>
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.completed ? 'y' : 'n'}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}