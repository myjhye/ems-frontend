import { useEffect, useState } from "react"
import { listDepartments } from "../services/DepartmentService";
import { Link } from "react-router-dom";

export default function ListDepartmentComponent() {

    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getAllDepartments();
    }, []);

    
    // 전체 부서 조회 핸들러
    function getAllDepartments() {

        listDepartments()
            .then((res) => {
                setDepartments(res.data);
            })
            .catch(error =>{
                console.error(error);
            })
    }

    return (
        <div className="container">
            <h2 className="text-center">부서 관리</h2>
            <Link to='/add-department' className="btn btn-primary mb-2">부서 등록</Link>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>부서 이름</th>
                        <th>부서 설명</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departments.map(((dept) =>(
                            <tr key={dept.id}>
                                <td>{dept.id}</td>
                                <td>{dept.departmentName}</td>
                                <td>{dept.departmentDescription}</td>
                            </tr>
                        )))
                    }
                </tbody>
            </table>
        </div>
    )
}