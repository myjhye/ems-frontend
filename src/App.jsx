import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ListDepartmentComponent from './pages/ListDepartmentComponent'
import EmployeeComponent from './pages/EmployeeComponent'
import ListEmployeeComponents from './pages/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import DepartmentComponent from './pages/DepartmentComponent'
import ListTodoComponent from './pages/ListTodoComponent'
import TodoComponent from './pages/TodoComponent'
import RegisterComponent from './pages/RegisterComponent'


function App() {

  return (
    <>
      <BrowserRouter>
          <HeaderComponent />
              <Routes>
                  

                  {/* -------------- employee -------------- */}
                  {/* 직원 목록 */}
                  <Route path='/' element={ <ListEmployeeComponents /> }></Route>
                  <Route path='/employees' element={ <ListEmployeeComponents /> }></Route>
                  
                  {/* 직원 등록 */}
                  <Route path='/add-employee' element={ <EmployeeComponent /> }></Route>
                  
                  {/* 직원 수정 */}
                  <Route path='/edit-employee/:id' element={ <EmployeeComponent /> }></Route>




                  {/* -------------- department -------------- */}
                  {/* 부서 목록 */}
                  <Route path='/departments' element={ <ListDepartmentComponent /> }></Route>
                  
                  {/* 부서 등록 */}
                  <Route path='/add-department' element={ <DepartmentComponent /> }></Route>

                  {/* 부서 수정 */}
                  <Route path='/edit-department/:id' element={ <DepartmentComponent /> }></Route>



                  {/* -------------- todo -------------- */}
                  {/* 투두 목록 */}
                  <Route path='/todos' element={ <ListTodoComponent /> }></Route>
                  
                  {/* 투두 등록 */}
                  <Route path='/add-todo' element={ <TodoComponent /> }></Route>

                  {/* 투두 수정 */}
                  <Route path='/update-todo/:id' element={ <TodoComponent /> }></Route>



                  {/* -------------- user -------------- */}
                    {/* 회원가입 */}
                  <Route path='/register' element={ <RegisterComponent /> }></Route>

              </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
