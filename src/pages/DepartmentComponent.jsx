import { useEffect, useState } from "react"
import { createDepartment, getDepartments } from "../services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";

export default function DepartmentComponent() {

    const [departmentName, setDepartmentName] = useState('');
    const [departmentDescription, setDepartmentDescription] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();




    // 입력 필드에 초기 값 설정 -> 수정 모드
    useEffect(() => {

        if (id) {

            // 해당 부서 정보를 서버에서 가져옴
            getDepartments(id)
                .then((res) => {

                    // 서버에서 받아온 부서 정보를 각 입력 필드의 초기 값을 설정
                    setDepartmentName(res.data.departmentName);
                    setDepartmentDescription(res.data.departmentDescription);
                })
                .catch(error => {
                    console.error(error);
                })
        }

    // 컴포넌트 초기 마운트 & id 변경 시 실행
    }, [id]);




    // 등록 & 수정 화면 별로 헤더 다르게 설정
    function pageTitle() {

        if (id) {
            return <h2 className="text-center mt-3">부서 수정</h2>
        } else {
            return <h2 className="text-center mt-3">부서 등록</h2>
        }
    }




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
                    {
                        pageTitle()
                    }
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