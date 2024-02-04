import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import './LoginPage.css'
import { UserContext } from '../../UserContent'

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const { setUserInfo } = useContext(UserContext)

    const loginForm = async (e) => {
        e.preventDefault()

        try {
            let response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            if (!response.ok) {
                const errorData = await response.json()
                if (errorData.error === 'Incorrect credentials') {
                    alert("Incorrect credentials")
                } else {
                    alert("Internal Server Error")
                }
            } else {
                response.json().then(userInfo => {
                    setUserInfo(userInfo)
                    setRedirect(true)
                })
            }
        } catch (err) {
            console.log("An error occurred\n\n", err)
        }
    }

    if(redirect){
        return <Navigate to='/' />
    }

    return (
        <form className='loginForm' onSubmit={loginForm}>
            <div className="headerArea">
                <h1>Here you can Login</h1>
                <p>Let's join us &#8594;</p>
            </div>

            <div className="inputFields">
                <div className="inputArea">
                    <label>Email</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="inputArea">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </div>
        </form>
    )
}

export default LoginPage