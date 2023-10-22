import { useState } from "react";

export default function LoginComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    function handleLoginForm(e) {

        e.preventDefault();

        const loginObj = { username, password }

        console.log(loginObj);
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
            </div>
          </div>
        </div>
      );
  }
  