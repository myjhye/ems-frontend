import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ListDepartmentComponent from './pages/ListDepartmentComponent'
import EmployeeComponent from './pages/EmployeeComponent'
import ListEmployeeComponents from './pages/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import DepartmentComponent from './pages/DepartmentComponent'
import ListTodoComponent from './pages/ListTodoComponent'
import TodoComponent from './pages/TodoComponent'
import RegisterComponent from './pages/RegisterComponent'
import LoginComponent from './pages/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'

function App() {

  // 경로 보호 -> 로그인 한 유저만 접근 허용
  function AuthenticatedRoute({ children }) {
    // 유저 로그인 상태 확인
    const isAuth = isUserLoggedIn();

    // 유저가 로그인 한 경우 자식 컴포넌트 렌더링
    if (isAuth) {
      return children;
    }

    // 유저가 로그인 하지 않은 경우 로그인 화면으로 리다이렉트 
    return <Navigate to='/' />;
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={ <LoginComponent /> }></Route>

          {/* -------------- employee -------------- */}
          {/* 직원 목록 */}
          <Route path='/employees' element={
            <AuthenticatedRoute>
              <ListEmployeeComponents />
            </AuthenticatedRoute>
          }></Route>

          {/* 직원 등록 */}
          <Route path='/add-employee' element={
            <AuthenticatedRoute>
              <EmployeeComponent />
            </AuthenticatedRoute>
          }></Route>

          {/* 직원 수정 */}
          <Route path='/edit-employee/:id' element={
            <AuthenticatedRoute>
              <EmployeeComponent />
            </AuthenticatedRoute>
          }></Route>

          {/* -------------- department -------------- */}
          {/* 부서 목록 */}
          <Route path='/departments' element={
            <AuthenticatedRoute>
              <ListDepartmentComponent />
            </AuthenticatedRoute>
          }></Route>

          {/* 부서 등록 */}
          <Route path='/add-department' element={
            <AuthenticatedRoute>
              <DepartmentComponent />
            </AuthenticatedRoute>
          }></Route>

          {/* 부서 수정 */}
          <Route path='/edit-department/:id' element={
            <AuthenticatedRoute>
              <DepartmentComponent />
            </AuthenticatedRoute>
          }></Route>

          {/* -------------- todo -------------- */}
          {/* 투두 목록 */}
          <Route path='/todos' element={
            <AuthenticatedRoute>
              <ListTodoComponent />
            </AuthenticatedRoute>
          }></Route>

          {/* 투두 등록 */}
          <Route path='/add-todo' element={
            <AuthenticatedRoute>
              <TodoComponent />
            </AuthenticatedRoute>
          }></Route>

          {/* 투두 수정 */}
          <Route path='/update-todo/:id' element={
            <AuthenticatedRoute>
              <TodoComponent />
            </AuthenticatedRoute>
          }></Route>

          {/* -------------- user -------------- */}
          {/* 회원가입 */}
          <Route path='/register' element={ <RegisterComponent /> }></Route>

          {/* 로그인 */}
          <Route path='/login' element={ <LoginComponent /> }></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
