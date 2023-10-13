import { useState } from "react"
import { createDepartment } from "../services/DepartmentService";
import { useNavigate } from "react-router-dom";

export default function DepartmentComponent() {

    const [departmentName, setDepartmentName] = useState('');
    const [departmentDescription, setDepartmentDescription] = useState('');

    const navigate = useNavigate();

    function saveOrUpdateDepartment(e) {

        e.preventDefault();

        const department = { departmentName, departmentDescription }

        console.log(department);

        createDepartment(department)
            .then((res) => {
                console.log(res.data);
                navigate('/departments');
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="card mt-4 col-md-6 offset-md-3 offset-md-3">
                    <h2 className="text-center mt-3">부서 등록</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">부서 이름</label>
                                <input 
                                    type="text"
                                    name="departmentName"
                                    placeholder="부서 이름 입력"
                                    value={departmentName}
                                    onChange={(e) => setDepartmentName(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">부서 설명</label>
                                <input 
                                    type="text"
                                    name="departmentDescription"
                                    placeholder="부서 설명 입력"
                                    value={departmentDescription}
                                    onChange={(e) => setDepartmentDescription(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <button 
                                className="btn btn-success mt-4"  
                                style={{ width: '100%' }} 
                                onClick={saveOrUpdateDepartment}
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