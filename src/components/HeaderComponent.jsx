import { NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../services/AuthService";

export default function HeaderComponent() {

    const isAuth = isUserLoggedIn();
    const navigate = useNavigate();

    function handleLogout() {

        logout();
        navigate('/login');
    }

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

                    <div style={{marginLeft: 'auto'}}>
                        <ul className="navbar-nav">
                            {!isAuth && (
                                <>
                                    <li className="nav-item">
                                        <NavLink className='nav-link' to='/register'>회원가입</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className='nav-link' to='/login'>로그인</NavLink>
                                    </li>
                                </>
                            )}
                            {isAuth && (
                                <>
                                    <li className="nav-item">
                                        <NavLink className='nav-link' to='/login' onClick={handleLogout}>로그아웃</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    )
}
