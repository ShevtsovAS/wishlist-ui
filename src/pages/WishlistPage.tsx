import { useEffect, useState } from 'react'
import axios from 'axios'
import './WishlistPage.css'

const WishlistPage = () => {
    const [wishes, setWishes] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [sortBy, setSortBy] = useState('createdAt')
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

    const pageSize = 10

    const fetchWishes = async (page: number) => {
        const token = localStorage.getItem('token')
        setLoading(true)

        try {
            const response = await axios.get('/api/wishes', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    page,
                    size: pageSize,
                    sort: sortBy,
                    direction: sortDir
                }
            })

            setWishes(response.data.wishes || [])
            setTotalPages(response.data.totalPages)
            setCurrentPage(response.data.currentPage)
        } catch (err: any) {
            console.error(err)
            setError('Failed to fetch wishes')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchWishes(currentPage)
    }, [currentPage, sortBy, sortDir])

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="wishlist-container">
            <h2>My Wishlist</h2>

            {/* Сортировка */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div>
                    <label style={{ marginRight: 8 }}>Sort by:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="createdAt">Created At</option>
                        <option value="priority">Priority</option>
                        <option value="dueDate">Due Date</option>
                    </select>
                </div>
                <div>
                    <label style={{ marginRight: 8 }}>Direction:</label>
                    <select value={sortDir} onChange={(e) => setSortDir(e.target.value as 'asc' | 'desc')}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>

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
                        <td>{wish.completed ? 'Yes' : 'No'}</td>
                        <td>{wish.priority}</td>
                        <td>{wish.category}</td>
                        <td>{wish.dueDate?.slice(0, 10)}</td>
                        <td>{wish.completedAt?.slice(0, 10) || '-'}</td>
                        <td>{wish.createdAt?.slice(0, 10)}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Пагинация */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0}>
                    Previous
                </button>
                <span style={{ margin: '0 12px' }}>Page {currentPage + 1} of {totalPages}</span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))} disabled={currentPage >= totalPages - 1}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default WishlistPage
