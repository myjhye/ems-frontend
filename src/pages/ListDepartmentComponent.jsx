import { useEffect, useState } from "react"
import { deleteDepartment, listDepartments } from "../services/DepartmentService";
import { Link, useNavigate } from "react-router-dom";

export default function ListDepartmentComponent() {

    const [departments, setDepartments] = useState([]);

    const navigate = useNavigate();



    // 전체 부서 목록 읽어오기 -> 초기 렌더링 시
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



    // 직원 삭제 핸들러
    function removeDepartment(id) {

        if (window.confirm('삭제하시겠습니까?')) {

            deleteDepartment(id)
                .then((res) => {
                    console.log(res.data);

                    // 삭제 후 부서 목록 읽어오기
                    getAllDepartments();
                })
                .catch(error => {
                    console.error(error);
                })

        }
    }

    return (
        <div className="container">
            <h2 className="text-center mt-5 mb-3">부서 리스트</h2>
            <Link to='/add-department' className="btn btn-primary mb-2">부서 등록</Link>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>부서 이름</th>
                        <th>부서 설명</th>
                        <th>기능</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.length === 0 ? (
                        <tr>
                            <td colSpan="5">등록된 부서가 없습니다.</td>
                        </tr>
                    ) : (
                        departments.slice().reverse().map((dept) => (
                            <tr key={dept.id}>
                                <td>{dept.id}</td>
                                <td>{dept.departmentName}</td>
                                <td>{dept.departmentDescription}</td>
                                <td>
                                    <button
                                        className="btn btn-info"
                                        onClick={() => navigate(`/edit-department/${dept.id}`)}
                                    >
                                        수정
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        style={{ marginLeft: '5px' }}
                                        onClick={() => removeDepartment(dept.id)}
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}