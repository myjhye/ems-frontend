import { useEffect, useState } from "react";
import { createEmployee, getEmployees, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { listDepartments } from "../services/DepartmentService";

export default function EmployeeComponent() {
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [email, setEmail] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [errors, setErrors] = useState({
    fullName: '',
    department: '',
    email: '',
  });
  const [errorEmail, setErrorEmail] = useState('');

  const emailDomains = ["google.com", "yahoo.com", "naver.com", "example.com", "직접 입력"];

  const navigate = useNavigate();
  const { id } = useParams();

  // 입력 필드에 초기 값 설정 -> 수정 모드
  useEffect(() => {
    if (id) {
      // 해당 직원 정보를 서버에서 가져옴
      getEmployees(id)
        .then((res) => {
          
          // 서버에서 받아온 직원 정보를 각 입력 필드의 초기 값으로 설정
          setFullName(res.data.fullName);
          setDepartment(res.data.department);
          
          // "@" 이전 부분 추출
          const emailParts = res.data.email.split('@');


          // 도메인 값이 옵션에 없으면 -> 이메일 전체 출력 & 도메인을 '직접 입력'으로 설정
          if (!emailDomains.includes(emailParts[1])) {
            setEmail(res.data.email);
            setEmailDomain('직접 입력');
          
          // 도메인 값이 옵션에 있으면 -> 이메일 "@" 이전 부분 + 이메일 "@" 이후 부분
          } else {
            setEmail(emailParts[0]);
            setEmailDomain(emailParts[1]);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
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
    const errorsCopy = { ...errors };

    if (fullName.trim()) {
      errorsCopy.fullName = '';
    } else {
      errorsCopy.fullName = '이름을 입력하세요';
      valid = false;
    }

    if (department) {
      errorsCopy.department = '';
    } else {
      errorsCopy.department = '부서를 선택하세요';
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = '이메일을 입력하세요';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }


  // 중복 코드를 추출한 함수
  function saveEmployee(employeeData) {
    if (id) {
      updateEmployee(id, employeeData)
        .then((res) => {
          console.log(res.data);
          navigate('/employees');
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      createEmployee(employeeData)
        .then((res) => {
          console.log(res.data);
          navigate('/employees');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  // 직원 등록 & 수정 핸들러
  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (emptyValidateForm()) {
      if (emailDomain === "직접 입력") {
        // "직접 입력" 옵션 선택 시에만 이메일 형식 검사 실행
        if (emailValidateForm(email)) {
          let emailToSave = email;
          const employeeData = { fullName, department, email: emailToSave };
          saveEmployee(employeeData);
        } else {
          setErrorEmail('올바른 이메일 형식을 입력하세요');
        }
      } else {
        // "직접 입력"이 아닌 경우, 이메일 형식 검사를 수행하지 않고 에러 메시지 초기화
        setErrorEmail('');
        let emailToSave = `${email}@${emailDomain}`;
        const employeeData = { fullName, department, email: emailToSave };
        saveEmployee(employeeData);
      }
    }
  }


  // 이메일 형식 유효성 검사
  function emailValidateForm(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }


  // 등록 & 수정 화면 별로 타이틀 헤더 설정
  function pageTitle() {
    if (id) {
      return <h2 className="text-center mt-3">직원 수정</h2>;
    } else {
      return <h2 className="text-center mt-3">직원 등록</h2>;
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="card mt-4 col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              {/* 이름 */}
              <div className="form-group mb-2">
                <label className="form-label">이름</label>
                <input
                  type="text"
                  placeholder="이름 입력"
                  name="fullName"
                  value={fullName}
                  className={`form-control mb-4 ${errors.fullName ? 'is-invalid' : ''}`}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && <p className="invalid-feedback">{errors.fullName}</p>}
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
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="이메일 아이디 입력"
                    name="email"
                    value={email}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <select
                    name="emailDomain"
                    value={emailDomain}
                    className="form-control"
                    onChange={(e) => setEmailDomain(e.target.value)}
                  >
                    {emailDomains.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>
                {/* 에러 - 입력 칸이 공백일 때 */}
                {errors.email && <p className="text-danger">{errors.email}</p>}
                {/* 에러 - 이메일 형식이 맞지 않을 때 */}
                {email && errorEmail && <p className="text-danger">{errorEmail}</p>}
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
  );
}
