import { useState } from "react"

export default function EmployeeComponent() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');


    // 직원 등록 핸들러
    function saveEmployee(e) {

        e.preventDefault();

        const employee = {firstName, lastName, email}
        console.log(employee);
        
    }

    return (
        <div className="container">
            <div className="row">
                <div className="card mt-4 col-md-6 offset-md-3 offset-md-3">
                    <h2 className="text-center mt-3">직원 등록</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">First Name</label>
                                <input 
                                    type='text' 
                                    placeholder="이름 입력" 
                                    name='firstName' 
                                    value={firstName}
                                    className="form-control mb-4"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Last Name</label>
                                <input 
                                    type='text' 
                                    placeholder="성 입력" 
                                    name='lastName' 
                                    value={lastName}
                                    className="form-control mb-4"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Email</label>
                                <input 
                                    type='email' 
                                    placeholder="이메일 입력" 
                                    name='email' 
                                    value={email}
                                    className="form-control mb-4"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
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