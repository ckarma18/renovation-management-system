import { useNavigate } from 'react-router-dom'

function CustomerDashboard() {
    const navigate = useNavigate()

    const username = localStorage.getItem('username')

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('tokenType')
        localStorage.removeItem('username')
        localStorage.removeItem('role')

        navigate('/login')
    }

    return (
        <div style={{ padding: '40px' }}>
            <h1>Customer Dashboard</h1>

            <p>
                Welcome, {username}
            </p>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default CustomerDashboard