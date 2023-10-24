import React, { useState } from "react";
import { registerAPICall } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function RegisterComponent() {
  
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    
    
    // 비밀번호 유효성 검사
    const isPasswordValid = (password) => {
      
      // 8글자 이상, 소문자, 숫자 포함 조건
      const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{8,}$/;
      
      return passwordRegex.test(password);
    }






    // 비밀번호 입력 시 오류 메시지 삭제 -> 비밀번호 유효성
    const handlePasswordChange = (e) => {
      

      // 입력되는 새 비밀번호 가져옴 -> 데이터를 newPassword 변수에 미리 저장 시켜 큐 대기 없이 즉각 화면 업데이트
      const newPassword = e.target.value;
      setPassword(newPassword);
      

      // 입력된 새 비밀번호가 유효한지 확인
      if (isPasswordValid(newPassword)) {
        
        // 유효하면, 비밀번호 오류 메세지 초기화해 삭제
        setPasswordError("");
      }
    
    }





    // 비밀번호 입력 시 오류 메시지 삭제 -> 비밀번호 확인
    const handleConfirmPasswordChange = (e) => {
      


      // 입력되는 새 확인 비밀번호 가져옴  
      const newConfirmPassword = e.target.value;
      setConfirmPassword(newConfirmPassword);
      
      
      // 입력된 새 확인 비밀번호가 비밀번호와 일치하는지 확인 
      if (newConfirmPassword === password) {

        // 일치하면, 확인 비밀번호 오류 메세지 초기화해 삭제
        setConfirmPasswordError("");
      }
    }







    // 회원가입 핸들러
    function handleRegistrationForm(e) {
      e.preventDefault();

      // 비밀번호 유효하지 않음
      if (!isPasswordValid(password)) {
          setPasswordError('8-16자의 영문 소문자, 숫자를 사용해 주세요');
          return;
      }

      // 입력한 비밀번호와 확인 비밀번호 일치하지 않음
      if (password !== confirmPassword) {
          setConfirmPasswordError('비밀번호가 일치하지 않습니다');
          return;
      }




      const register = { name, username, email, password };
      console.log(register);

      // 핸들러
      registerAPICall(register)
        
      
        // 성공
        .then((res) => {
          console.log(res.data);
          
          navigate('/login')
          alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다!')
          
        })
        
        // 에러
        .catch((error) => {
          
           if (error.response && error.response.status === 400) {
            
            // 닉네임 중복 에러
            if (error.response.data.message.includes("닉네임")) {
              setErrorMessage("닉네임이 이미 등록되어 있습니다");
            }
            
            // 이메일 중복 에러    
            else if (error.response.data.message.includes("이메일")) {
              setErrorMessage("이메일이 이미 등록되어 있습니다");
            }
          }
          
          // 그 외 에러        
          else {
            setErrorMessage("오류가 발생했습니다.");
          }
        });
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
                        onChange={handlePasswordChange}
                      />
                    </div>
                  </div>
                  {passwordError && <div className="alert alert-danger">{passwordError}</div> }

                  <div className="row mb-3">
                    <label className="col-md-3 control-label">비밀번호 확인</label>
                    <div className="col-md-9">
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                    </div>
                  </div>
                  {confirmPasswordError && <div className="alert alert-danger">{confirmPasswordError}</div> }

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
