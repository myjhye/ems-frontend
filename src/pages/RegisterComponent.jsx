import React, { useState } from "react";
import { registerAPICall } from "../services/AuthService";

export default function RegisterComponent() {
  
    const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");





  // 회원가입 핸들러
  function handleRegistrationForm(e) {
    e.preventDefault();

    const register = { name, username, email, password };

    console.log(register);


    // 핸들러
    registerAPICall(register)
      
    
      // 성공
      .then((res) => {
        console.log(res.data);
      })


      // 에러
      .catch((error) => {
        
        if (error.response && error.response.status === 400) {
          
            // 닉네임 중복 에러
            if (error.response.data.message.includes("닉네임")) {
            setErrorMessage("닉네임이 이미 등록되어 있습니다");
            
            // 이메일 중복 에러    
            } else if (error.response.data.message.includes("이메일")) {
                setErrorMessage("이메일이 이미 등록되어 있습니다");
            


        // 그 외 에러        
        } else {
          setErrorMessage("오류가 발생했습니다.");
        }
      }
    })
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
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
                      type="text"
                      name="name"
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
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="닉네임 입력"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                {/* 닉네임 중복 에러 문구 */}
                {errorMessage && errorMessage.includes("닉네임") && (
                  <div className="alert alert-danger">
                    {errorMessage}
                  </div>
                )}
                <div className="row mb-3">
                  <label className="col-md-3 control-label">이메일</label>
                  <div className="col-md-9">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="이메일 입력"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>


                {/* 이메일 중복 에러 문구 */}
                {errorMessage && errorMessage.includes("이메일") && (
                  <div className="alert alert-danger">
                    {errorMessage}
                  </div>
                )}
                <div className="row mb-3">
                  <label className="col-md-3 control-label">비밀번호</label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
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
                    onClick={handleRegistrationForm}
                    style={{ width: "100%" }}
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
  );
}
