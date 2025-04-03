import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './LoginPage.css'
import axios from 'axios'

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await axios.post('http://localhost:8080/api/auth/register', {
                email,
                username,
                password,
            })

            alert('Registration successful! You can now log in.')
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
