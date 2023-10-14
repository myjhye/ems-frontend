import { useEffect, useState } from "react"
import { createEmployee, getEmployees, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { listDepartments } from "../services/DepartmentService";

export default function EmployeeComponent() {

    const [fullName, setfullName] = useState('');
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
        fullName: '',
        department: '',
        email: '',
    })
    const [errorEmail, setErrorEmail] = useState('');


    const navigate = useNavigate();
    const { id } = useParams();



    // 입력 필드에 초기 값 설정 -> 수정 모드
    useEffect(() => {

        if (id) {

            // 해당 직원 정보를 서버에서 가져옴 
            getEmployees(id)
                .then((res) => {

                    // 서버에서 받아온 직원 정보를 각 입력 필드의 초기 값으로 설정
                    setfullName(res.data.fullName);
                    setDepartment(res.data.department);
                    setEmail(res.data.email);
                })
                .catch(error => {
                    console.error(error);
                })
        }

    // 컴포넌트 초기 마운트 & id 변경 시 실행
    }, [id]);




    // 부서 데이터 읽어오기 -> 부서 필드 값
    useEffect(() => {
        
        listDepartments()
            .then((res) => {
                // departmentName만 추출
                const departmentNames = res.data.map((dep) => dep.departmentName); 
                setDepartments(departmentNames);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    






    // 값 입력 유효성 검사
    function emptyValidateForm() {

        let valid = true;

        const errorsCopy = {
            ...errors
        }

        if (fullName.trim()) {
            errorsCopy.fullName = '';
        } else {
            errorsCopy.fullName = '이름을 입력하세요';
            valid = false;
        }

        if (department.trim()) {
            errorsCopy.department = '';
        } else {
            errorsCopy.department = '부서를 선택하세요';
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = '이메일을 입력하세요';
        }

        setErrors(errorsCopy);

        return valid;
    }





    // 이메일 형식 유효성 검사 
    function emailValidateForm(email) {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    }




    // 직원 등록 & 수정 핸들러
    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (emptyValidateForm()) {
            if (emailValidateForm(email)) {

                const employee = { fullName, department, email };
                

                // 직원 수정
                if(id) {

                    updateEmployee(id, employee)
                        .then((res) => {
                            console.log(res.data);
                            navigate('/employees');
                        })


                // 직원 등록
                } else {

                    createEmployee(employee)
                        .then((res) => {
                            console.log(res.data);
                            navigate('/employees');
                        })
                        .catch(error => {
                            console.error(error);
                        })
                }



            } else {
                setErrorEmail('올바른 이메일 형식을 입력하세요')
            }
        }
    }




    // 등록 & 수정 화면 별로 타이틀 헤더 설정
    function pageTitle() {
        
        if (id) {
            return <h2 className="text-center mt-3">직원 수정</h2>
        } else {
            return <h2 className="text-center mt-3">직원 등록</h2>
        }
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

                            {/* 이름 */}
                            <div className="form-group mb-2">
                                <label className="form-label">이름</label>
                                <input 
                                    type='text' 
                                    placeholder="이름 입력" 
                                    name='fullName' 
                                    value={fullName}
                                    className={`form-control mb-4 ${errors.fullName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setfullName(e.target.value)}
                                />
                                { errors.fullName && <p className="invalid-feedback">{errors.fullName}</p>}
                            </div>


                            {/* 부서 */}
                            <div className="form-group mb-2">
                                <label className="form-label">부서</label>
                                <select
                                    name="department"
                                    value={department}
                                    className={`form-control mb-4 ${errors.department ? "is-invalid" : ""}`}
                                    onChange={(e) => setDepartment(e.target.value)}
                                >
                                    <option value="">부서를 선택하세요</option>
                                    {departments.map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                                {errors.department && <p className="invalid-feedback">{errors.department}</p>}
                            </div>


                            {/* 이메일 */}
                            <div className="form-group mb-2">
                                <label className="form-label">Email</label>
                                <input 
                                    type="email"
                                    placeholder="이메일 입력" 
                                    name='email' 
                                    value={email}
                                    className={`form-control mb-4 ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {/* 에러 - 입력 칸이 공백일 때 */}
                                { errors.email && <p className="text-danger">{errors.email}</p> }
                                {/* 에러 - 이메일 형식이 맞지 않을 때 */}
                                { email && errorEmail && <p className="text-danger">{errorEmail}</p>}
                            </div>
                            <button 
                                className="btn btn-success"  
                                style={{ width: '100%' }} 
                                onClick={saveOrUpdateEmployee}
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