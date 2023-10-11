import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponents from './components/ListEmployeeComponent'
import EmployeeComponent from './components/EmployeeComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'

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
              </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
