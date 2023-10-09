import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponents from './components/ListEmployeeComponent'

function App() {

  return (
    <>
      <BrowserRouter>
          <HeaderComponent />
              <Routes>
                  <Route path='/' element={ <ListEmployeeComponents /> }></Route>
                  <Route path='/employees' element={ <ListEmployeeComponents /> }></Route>
              </Routes>
          <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
