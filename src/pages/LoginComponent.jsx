import { useState } from "react";
import { loginAPICall, saveLoggedInUser, storeToken } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();



    // 로그인 핸들러
    async function handleLoginForm(e) {

        e.preventDefault();

        // 아이디, 비번 필드 값 변경 시 에러 메시지 초기화
        setUsernameError("");
        setPasswordError("");
        setLoginError("");

        const loginObj = { username, password }

        console.log(loginObj);



        // 핸들러
        await loginAPICall(username, password)
            
        
            // 성공
            .then((res) => {
                console.log(res.data);

                //const token = 'Basic ' + window.btoa(username + ":" + password);
                
                const token = 'Bearer ' + res.data.accessToken;
                const role = res.data.role;
                
                storeToken(token);
                saveLoggedInUser(username, role);
                
                navigate('/todos');
                window.location.reload(false);
            })
            
            
            // 실패
            .catch(error => {

              if (error.response && error.response.status === 401) {

                // 아이디, 비번 모두 입력 되었을 때만 에러 메세지 표시
                if (username && password) {
                  setLoginError("계정이나 비밀번호를 확인하세요");
                }
              }

              if (!username && !password) {
                setUsernameError("아이디를 입력하세요");
                return;
              }

              if (!username) {
                setUsernameError("아이디를 입력하세요");
              }

              if (!password) {
                setPasswordError("비밀번호를 입력하세요");
              }

            })
    }


    return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-header">
                  <h2 className="text-center">로그인</h2>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row mb-3">
                      <label className="col-md-3 control-label">계정</label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          name="username"
                          className="form-control"
                          placeholder="닉네임 또는 이메일 입력"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
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
                        onClick={handleLoginForm}
                        style={{ width: "100%" }}
                      >
                        로그인
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* 로그인 에러 문구 -> 아이디나 비번 틀림 */}
              {loginError && (
                <div className="alert alert-danger">
                  {loginError}
                </div>
              )}
              {usernameError && (
                <div className="alert alert-danger">
                  {usernameError}
                </div>
              )}
              {passwordError && (
                <div className="alert alert-danger">
                  {passwordError}
                </div>
              )}
            </div>
          </div>
        </div>
      );
  }
  