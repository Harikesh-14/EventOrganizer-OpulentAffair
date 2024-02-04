import { useContext, useEffect, useState } from 'react'
import { Link, NavLink, Navigate } from 'react-router-dom'
import { UserContext } from '../../UserContent'

import './Header.css'

function Header() {
    const [showNavbar, setShowNavbar] = useState(false)
    const { userInfo, setUserInfo } = useContext(UserContext)
    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
    }

    useEffect(() => {
        fetch('http://localhost:3000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
            })
        })
    }, [])

    const logoutFunc = async () => {
        try {
            await fetch('http://localhost:3000/logout', {
                credentials: 'include',
                method: 'POST',
            });

            setUserInfo(null);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const firstName = userInfo?.firstName

    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="logo">
                        <NavLink to="/" className="link">Opulent Affairs</NavLink>
                    </div>
                    <div className="menu-icon" onClick={handleShowNavbar}>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                    <div className={`nav-elements  ${showNavbar && 'active'}`}>
                        <ul>
                            <li>
                                {firstName && (
                                    <>
                                        <p>{firstName}</p>
                                        <Link to='/user-profile'><button type='button'>Profile</button></Link>
                                        <Link to='/organize-event'><button type='button'>Organize</button></Link>
                                        <Link to='/'><button type='button' onClick={logoutFunc}>Logout</button></Link>
                                    </>
                                )}
                                {!firstName && (
                                    <>
                                        <Link to="/login"><button type='button'>Sign In</button></Link>
                                        <Link to="/register-user"><button type='button'>Sign Up</button></Link>
                                    </>
                                )}

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header