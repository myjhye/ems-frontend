import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ListDepartmentComponent from './pages/ListDepartmentComponent'
import EmployeeComponent from './pages/EmployeeComponent'
import ListEmployeeComponents from './pages/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import DepartmentComponent from './pages/DepartmentComponent'
import ListTodoComponent from './pages/ListTodoComponent'


function App() {

  return (
    <>
      <BrowserRouter>
          <HeaderComponent />
              <Routes>
                  
                  
                  {/* 직원 목록 */}
                  <Route path='/' element={ <ListEmployeeComponents /> }></Route>
                  <Route path='/employees' element={ <ListEmployeeComponents /> }></Route>
                  
                  {/* 직원 등록 */}
                  <Route path='/add-employee' element={ <EmployeeComponent /> }></Route>
                  
                  {/* 직원 수정 */}
                  <Route path='/edit-employee/:id' element={ <EmployeeComponent /> }></Route>




                  
                  {/* 부서 목록 */}
                  <Route path='/departments' element={ <ListDepartmentComponent /> }></Route>
                  
                  {/* 부서 등록 */}
                  <Route path='/add-department' element={ <DepartmentComponent /> }></Route>

                  {/* 부서 수정 */}
                  <Route path='/edit-department/:id' element={ <DepartmentComponent /> }></Route>



                  {/* 투두 목록 */}
                  <Route path='/todos' element={ <ListTodoComponent /> }></Route>

              </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
