import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            if (!response.ok) {
                throw new Error('Invalid credentials')
            }

            const data = await response.json()
            localStorage.setItem('token', data.accessToken)
            navigate('/wishlist')
        } catch (error) {
            alert('Login failed. Please try again.')
        }
    }

    return (
        <div className="login-container">
            <h2>LOG IN</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-btn">Log in</button>
                <div className="login-links">
                    <a href="/register">Register</a>
                    <a href="#">Forgot your password?</a>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
