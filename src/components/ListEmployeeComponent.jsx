import { useEffect, useState } from "react"
import { listEmployees } from "../services/EmployeeService";

export default function ListEmployeeComponents() {

    const [employees, setEmployees] = useState([]);

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
            <h2 className="text-center">List of Employees</h2>
            <table className="table table-striped table-bordered">
            <thead>
                <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Id</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((emp) => (
                <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.firstName}</td>
                    <td>{emp.lastName}</td>
                    <td>{emp.email}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}