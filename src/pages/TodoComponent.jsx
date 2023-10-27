import React, { useEffect, useState } from "react";
import { addTodo, getTodo, updateTodo } from "../services/TodoService";
import { useNavigate, useParams } from "react-router-dom";
import { listEmployees } from "../services/EmployeeService";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function TodoComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [employeeNames, setEmployeeNames] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEmployeeCards, setSelectedEmployeeCards] = useState([]); // 선택된 직원 카드 목록 추가
  const [startTime, setStartTime] = useState("09:00"); // 시작 시간
  const [endTime, setEndTime] = useState("10:00");
  const [date, setDate] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();




  // 입력 필드에 초기 값 설정 -> 수정 모드
  useEffect(() => {
    if (id) {
      // 해당 투두 정보를 서버에서 가져옴
      getTodo(id)
        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);





  // 저장 핸들러
  function saveTodo(e) {
    e.preventDefault();

    if (startTime >= endTime) {
        alert("시작 시간은 종료 시간보다 빨라야 합니다.");
        return; // 저장 중지
      }
    

    // 선택된 직원들을 쉼표로 구분하여 하나의 문자열로 만듭니다.
    const participantsString = selectedEmployees.join(", ");
    const todo = { 
        title, 
        description, 
        completed, 
        participants: participantsString,
        time: startTime  + ' ~ ' + endTime, 
    };

    // 수정
    if (id) {
      updateTodo(id, todo)
        .then((res) => {
          console.log(res.data);
          navigate("/todos");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log(todo);
      addTodo(todo)
        .then((res) => {
          console.log(res.data);
          navigate("/todos");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }






  // 등록 & 수정 화면 별로 헤더 설정
  function pageTitle() {
    if (id) {
      return <h2 className="text-center mt-3">일정 수정</h2>;
    } else {
      return <h2 className="text-center mt-3">일정 등록</h2>;
    }
  }




  // 직원 데이터 읽어오기 -> 필드 값
  useEffect(() => {
    listEmployees()
      .then((res) => {
        const employeeNames = res.data.map((employee) => employee.fullName);
        setEmployeeNames(employeeNames);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);





  // 선택된 직원 추가 또는 제거
  function handleEmployeeSelection(e) {
    
    const selectedEmployee = e.target.value;
    
    if (!selectedEmployees.includes(selectedEmployee)) {
    
      setSelectedEmployees([...selectedEmployees, selectedEmployee]);
      // 선택된 직원 카드 추가
      setSelectedEmployeeCards([...selectedEmployeeCards, selectedEmployee]);
    
    } else {
    
      const updatedSelectedEmployees = selectedEmployees.filter(
        (employee) => employee !== selectedEmployee
      );
    
      setSelectedEmployees(updatedSelectedEmployees);
    
      // 선택된 직원 카드 삭제
      const updatedSelectedEmployeeCards = selectedEmployeeCards.filter(
        (employee) => employee !== selectedEmployee
      );
    
      setSelectedEmployeeCards(updatedSelectedEmployeeCards);
    }
  }






  // 선택된 직원 카드 삭제
  function removeSelectedEmployeeCard(employeeName) {
    
    const updatedSelectedEmployeeCards = selectedEmployeeCards.filter(
      (employee) => employee !== employeeName
    );
    
    setSelectedEmployeeCards(updatedSelectedEmployeeCards);
    
    // 선택된 직원 목록에서도 삭제
    const updatedSelectedEmployees = selectedEmployees.filter(
      (employee) => employee !== employeeName
    );
    
    setSelectedEmployees(updatedSelectedEmployees);
  }


  function handleStartTimeChange(date) {
    setStartTime(date);
  }

  function handleEndTimeChange(date) {
    setEndTime(date);
  }





  return (
    <div className="container">
      <div className="row">
        <div className="card mt-4 col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">일정 제목</label>
                <input
                  type="text"
                  className="form-control mb-4"
                  placeholder="일정 제목 입력"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">일정 상세</label>
                <input
                  type="text"
                  className="form-control mb-4"
                  placeholder="일정 상세 입력"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">참여자</label>
                <select
                  name="employeNames"
                  value={selectedEmployees}
                  className="form-control"
                  onChange={handleEmployeeSelection}
                  multiple // 다중 선택 활성화
                >
                  {employeeNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="selected-employees row">
                {selectedEmployeeCards.map((employeeName) => (
                    <div key={employeeName} className="col-auto mb-3">
                    <div className="selected-employee-card">
                        {employeeName}
                        <button
                          className="remove-button"
                          onClick={() => removeSelectedEmployeeCard(employeeName)}
                        >
                        X
                        </button>
                    </div>
                    </div>
                ))}
              </div>


              {/* 일정 날짜 */}
              <div className="form-group mb-2">
                <label className="form-label mt-4">일정 날짜</label>
                <ReactDatePicker
                  selected={date} 
                  onChange={(date) => setDate(date)} 
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                />
              </div>

              {/* 시작 시간 */}
              <div className="form-group mb-2">
                <label className="form-label">시작 시간</label>
                <input
                  type="time"
                  value={startTime}
                  className="form-control"
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              {/* 종료 시간 */}
              <div className="form-group mb-2">
                <label className="form-label">종료 시간</label>
                <input
                  type="time"
                  value={endTime}
                  className="form-control"
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>

              {/* 저장 버튼 */}
              <button
                className="btn btn-success mt-4 mb-4"
                style={{ width: "100%" }}
                onClick={(e) => saveTodo(e)}
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
