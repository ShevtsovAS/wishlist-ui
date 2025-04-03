import { useEffect, useState } from 'react'
import axios from 'axios'
import './WishlistPage.css'

interface Wish {
    id: number
    title: string
    description: string
    completed: boolean
    priority: number
    category: string
    dueDate: string
    completedAt: string | null
    createdAt: string
}

const WishlistPage = () => {
    const [wishes, setWishes] = useState<Wish[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchWishes = async () => {
            const token = localStorage.getItem('token')
            try {
                const response = await axios.get('/api/wishes', {
                    headers: { Authorization: `Bearer ${token}` },
                })

                const data = response.data?.wishes || []
                setWishes(data)
            } catch (err: any) {
                console.error(err)
                setError('Failed to fetch wishes')
            } finally {
                setLoading(false)
            }
        }

        fetchWishes()
    }, [])

    if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>
    if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>

    return (
        <div className="wishlist-container">
            <h2>My Wishlist</h2>
            <table className="wishlist-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Completed</th>
                    <th>Priority</th>
                    <th>Category</th>
                    <th>Due Date</th>
                    <th>Completed At</th>
                    <th>Created At</th>
                </tr>
                </thead>
                <tbody>
                {wishes.map((wish) => (
                    <tr key={wish.id}>
                        <td>{wish.title}</td>
                        <td>{wish.description}</td>
                        <td>{wish.completed ? '✔️' : '❌'}</td>
                        <td>{wish.priority}</td>
                        <td>{wish.category}</td>
                        <td>{new Date(wish.dueDate).toLocaleDateString()}</td>
                        <td>{wish.completedAt ? new Date(wish.completedAt).toLocaleDateString() : '-'}</td>
                        <td>{new Date(wish.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default WishlistPage
