import { useState } from "react";
import { registerAPICall } from "../services/AuthService";

export default function RegisterComponent() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');




  function handleRegisterationForm(e) {

    e.preventDefault();

    const register = { name, username, email, password }

    console.log(register);

    registerAPICall(register)
        .then((res) => {
            console.log(res.data);
        })
        .catch(error => {
            console.error(error);
        })

  }


  return (
  
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-2">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-center">회원가입</h2>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row mb-3">
                                <label className="col-md-3 control-label">이름</label>
                                <div className="col-md-9">
                                    <input
                                        type='text'
                                        name='name'
                                        className="form-control"
                                        placeholder="이름 입력"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-md-3 control-label">닉네임</label>
                                <div className="col-md-9">
                                    <input
                                        type='text'
                                        name='username'
                                        className="form-control"
                                        placeholder="닉네임 입력"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-md-3 control-label">이메일</label>
                                <div className="col-md-9">
                                    <input
                                        type='email'
                                        name='email'
                                        className="form-control"
                                        placeholder="이메일 입력"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-md-3 control-label">비밀번호</label>
                                <div className="col-md-9">
                                    <input
                                        type='password'
                                        name='password'
                                        className="form-control"
                                        placeholder="비밀번호 입력"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group mb-3">
                                <button 
                                    className="btn btn-primary" 
                                    onClick={handleRegisterationForm}
                                    style={{ width: '100%' }}
                                >
                                    가입
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}