import { useEffect, useState } from 'react'
import axios from 'axios'
import './WishlistPage.css'

const WishlistPage = () => {
    const [wishes, setWishes] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [pageSize] = useState(10)
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
    const [searchTerm, setSearchTerm] = useState('')

    const [newWish, setNewWish] = useState({
        title: '',
        description: '',
        priority: 1,
        category: '',
        dueDate: ''
    })

    useEffect(() => {
        fetchWishes()
    }, [page, sortBy, sortDir])

    const fetchWishes = async () => {
        const token = localStorage.getItem('token')
        setLoading(true)

        try {
            const response = searchTerm.trim()
                ? await axios.get('/api/wishes/search', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { term: searchTerm.trim() }
                })
                : await axios.get('/api/wishes', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        page,
                        size: pageSize,
                        sort: sortBy,
                        direction: sortDir
                    }
                })

            if (searchTerm.trim()) {
                setWishes(response.data)
                setTotalItems(response.data.length)
                setTotalPages(1)
                setPage(0)
            } else {
                setWishes(response.data.wishes)
                setTotalItems(response.data.totalItems)
                setTotalPages(response.data.totalPages)
            }
        } catch (err: any) {
            console.error(err)
            setError('Failed to fetch wishes')
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = () => {
        setPage(0)
        fetchWishes()
    }

    const toggleSortDirection = () => {
        setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    }

    const handleSortChange = (newSort: string) => {
        if (sortBy === newSort) {
            toggleSortDirection()
        } else {
            setSortBy(newSort)
            setSortDir('asc')
        }
    }

    const handleAddWish = async () => {
        const token = localStorage.getItem('token')
        try {
            await axios.post('/api/wishes', newWish, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setNewWish({ title: '', description: '', priority: 1, category: '', dueDate: '' })
            fetchWishes()
        } catch (err) {
            console.error('Failed to add wish', err)
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="wishlist-container">
            <h2>My Wishlist</h2>

            <div className="wishlist-actions">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="add-wish-form">
                <input type="text" placeholder="Title" value={newWish.title} onChange={(e) => setNewWish({ ...newWish, title: e.target.value })} />
                <input type="text" placeholder="Description" value={newWish.description} onChange={(e) => setNewWish({ ...newWish, description: e.target.value })} />
                <input type="number" placeholder="Priority" value={newWish.priority} onChange={(e) => setNewWish({ ...newWish, priority: parseInt(e.target.value) })} />
                <input type="text" placeholder="Category" value={newWish.category} onChange={(e) => setNewWish({ ...newWish, category: e.target.value })} />
                <input type="datetime-local" value={newWish.dueDate} onChange={(e) => setNewWish({ ...newWish, dueDate: e.target.value })} />
                <button onClick={handleAddWish}>+ Add Wish</button>
            </div>

            {searchTerm && (
                <div style={{ textAlign: 'center', marginTop: '10px', color: '#555' }}>
                    🔍 Showing search results for: <strong>{searchTerm}</strong>
                </div>
            )}
            <table className="wishlist-table">
                <thead>
                <tr>
                    <th onClick={() => handleSortChange('title')}>Title</th>
                    <th>Description</th>
                    <th onClick={() => handleSortChange('completed')}>Completed</th>
                    <th onClick={() => handleSortChange('priority')}>Priority</th>
                    <th onClick={() => handleSortChange('category')}>Category</th>
                    <th onClick={() => handleSortChange('dueDate')}>Due Date</th>
                    <th>Completed At</th>
                    <th onClick={() => handleSortChange('createdAt')}>Created At</th>
                </tr>
                </thead>
                <tbody>
                {wishes.map((wish) => (
                    <tr key={wish.id}>
                        <td>{wish.title}</td>
                        <td>{wish.description}</td>
                        <td>{wish.completed ? '✅' : '❌'}</td>
                        <td>{wish.priority}</td>
                        <td>{wish.category}</td>
                        <td>{wish.dueDate?.slice(0, 16).replace('T', ' ')}</td>
                        <td>{wish.completedAt?.slice(0, 16).replace('T', ' ') || '-'}</td>
                        <td>{wish.createdAt?.slice(0, 16).replace('T', ' ')}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {!searchTerm && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 0))}
                        disabled={page === 0}
                    >
                        Previous
                    </button>
                    <span style={{ margin: '0 10px' }}>
                        Page {page + 1} of {totalPages} (Total: {totalItems})
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                        disabled={page + 1 === totalPages}
                    >
                        Next
                    </button>
                    <button style={{ marginLeft: '20px' }} onClick={toggleSortDirection}>
                        Sort: {sortDir.toUpperCase()}
                    </button>
                </div>
            )}
        </div>
    )
}

export default WishlistPage
