import { RouteObject } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import WishlistPage from './pages/WishlistPage.tsx'

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <WishlistPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
]