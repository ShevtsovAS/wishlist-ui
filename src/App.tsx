import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import WishlistPage from './pages/WishlistPage'
import PrivateRoute from './routes/PrivateRoute'

export default function App() {
    const isAuthenticated = !!localStorage.getItem('token') // временно

    return (
        <Routes>
            <Route path="/" element={
                isAuthenticated ? <Navigate to="/wishlist" replace /> : <Navigate to="/login" replace />
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/wishlist"
                element={
                    <PrivateRoute>
                        <WishlistPage />
                    </PrivateRoute>
                }
            />
        </Routes>
    )
}
