import { useState } from "react"
import { addTodo } from "../services/TodoService";
import { useNavigate } from "react-router-dom";

export default function TodoComponent() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    const navigate = useNavigate();


    function saveTodo(e) {

        e.preventDefault();

        const todo = { title, description, completed } 

        addTodo(todo) 
            .then((res) => {
                console.log(res.data);
                navigate('/todos');
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="card mt-4 col-md-6 offset-md-3 offset-md-3">
                    <h2 className="text-center mt-3">일정 등록</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">일정 제목</label>
                                <input
                                    type='text'
                                    className="form-control mb-4"
                                    placeholder="일정 제목 입력"
                                    name='title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                >
                                </input>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">일정 상세</label>
                                <input
                                    type='text'
                                    className="form-control mb-4"
                                    placeholder="일정 제목 입력"
                                    name='description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </input>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">일정 상세</label>
                                <select
                                    className="form-control mb-4"
                                    value={completed}
                                    onChange={(e) => setCompleted(e.target.value)}
                                >
                                    <option value="false">n</option>
                                    <option value="true">y</option>
                                </select>
                            </div>
                            <button 
                                className="btn btn-success mb-4" 
                                style={{ width: '100%' }}
                                onClick={(e) => saveTodo(e)}
                            >
                                등록
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}