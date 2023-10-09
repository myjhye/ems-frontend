import { useEffect, useState } from "react"
import { listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

export default function ListEmployeeComponents() {

    const [employees, setEmployees] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        listEmployees()
            .then((res) => {
                setEmployees(res.data);
                console.log(employees);
            })
            .catch(error => {
                console.error(error);
            })
    }, [])





    return (
        <div className="container">
            <h2 className="text-center mt-5 mb-3">직원 리스트</h2>
            <button 
                className="btn btn-primary mb-3" 
                onClick={() => navigate('/add-employee')}
            >
                직원 등록
            </button>
            <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th className="text-center">Id</th>
                    <th className="text-center">First Name</th>
                    <th className="text-center">Last Name</th>
                    <th className="text-center">Email Id</th>
                    <th className="text-center">기능</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((emp) => (
                    <tr key={emp.id}>
                        <td className="text-center">{emp.id}</td>
                        <td className="text-center">{emp.firstName}</td>
                        <td className="text-center">{emp.lastName}</td>
                        <td className="text-center">{emp.email}</td>
                        <td>
                            <button className="btn btn-info" onClick={() => navigate(`/edit-employee/${emp.id}` )}>수정</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}