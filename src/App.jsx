import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponents from './components/ListEmployeeComponent'
import EmployeeComponent from './components/EmployeeComponent'

function App() {

  return (
    <>
      <BrowserRouter>
          <HeaderComponent />
              <Routes>
                  <Route path='/' element={ <ListEmployeeComponents /> }></Route>
                  <Route path='/employees' element={ <ListEmployeeComponents /> }></Route>
                  <Route path='/add-employee' element={ <EmployeeComponent /> }></Route>
              </Routes>
          <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
