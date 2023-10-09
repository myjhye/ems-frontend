import { useEffect, useState } from "react"
import { createEmployee, getEmployees } from "../services/EmployeeService";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EmployeeComponent() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();


    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
    })

    const [errorEmail, setErrorEmail] = useState('');





    // 입력 필드에 초기 값 설정

    // 컴포넌트 초기 마운트 & id 변경 시 실행
    useEffect(() => {

        // id가 있으면 -> 수정 모드
        if (id) {

            // 해당 직원 정보를 서버에서 가져옴 
            getEmployees(id)
                .then((res) => {

                    // 서버에서 받아온 직원 정보를 각 입력 필드의 초기 값으로 설정
                    setFirstName(res.data.firstName);
                    setLastName(res.data.lastName);
                    setEmail(res.data.email);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }, [id]);



    // 값 입력 유효성 검사
    function emptyValidateForm() {

        let valid = true;

        const errorsCopy = {
            ...errors
        }

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = '이름을 입력하세요';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = '성을 입력하세요';
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




    // 직원 등록 핸들러
    function saveEmployee(e) {
        e.preventDefault();

        if (emptyValidateForm()) {
            if (emailValidateForm(email)) {
                const employee = { firstName, lastName, email };

                // 직원 등록
                createEmployee(employee)
                    .then((res) => {
                        console.log(res.data);
                        navigate('/employees');
                    });
            } else {
                setErrorEmail('올바른 이메일 형식을 입력하세요')
            }
        }
    }




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
                            <div className="form-group mb-2">
                                <label className="form-label">First Name</label>
                                <input 
                                    type='text' 
                                    placeholder="이름 입력" 
                                    name='firstName' 
                                    value={firstName}
                                    className={`form-control mb-4 ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                { errors.firstName && <p className="invalid-feedback">{errors.firstName}</p>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Last Name</label>
                                <input 
                                    type='text' 
                                    placeholder="성 입력" 
                                    name='lastName' 
                                    value={lastName}
                                    className={`form-control mb-4 ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                { errors.lastName && <p className="invalid-feedback">{errors.lastName}</p>}
                            </div>
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
                                onClick={saveEmployee}
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