import { useEffect, useState } from "react"
import { createEmployee, getEmployees, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

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





    // 입력 필드에 초기 값 설정 -> 수정 모드
    useEffect(() => {

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

    // 컴포넌트 초기 마운트 & id 변경 시 실행
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




    // 직원 등록 & 수정 핸들러
    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (emptyValidateForm()) {
            if (emailValidateForm(email)) {

                const employee = { firstName, lastName, email };
                

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




    // 등록 & 수정 화면 별로 타이틀 다르게 설정
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