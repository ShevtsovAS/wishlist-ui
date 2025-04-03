import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './LoginPage.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await axios.post('/api/auth/signup', {
                email,
                username,
                password,
            })

            navigate('/login')
        } catch (error) {
            console.error('Registration error:', error)
            alert('Registration failed. Please try again.')
        }
    }

    return (
        <div className="login-container">
            <h2>REGISTRATION</h2>
            <form className="login-form" onSubmit={handleRegister}>
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-btn">
                    Register
                </button>
                <div className="login-links">
                    <Link to="/login">Login</Link>
                    <span></span>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage
