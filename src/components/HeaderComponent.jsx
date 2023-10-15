import { NavLink } from "react-router-dom";

export default function HeaderComponent() {
    
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className='navbar-brand' href='/'>EMS 관리</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/employees'>직원</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/departments'>부서</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/todos'>일정</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    )
}