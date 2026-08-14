import { NavLink, useNavigate } from 'react-router-dom'

function AdminSidebar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('tokenType')
        localStorage.removeItem('username')
        localStorage.removeItem('role')

        navigate('/login')
    }

    return (
        <aside className="dashboard-sidebar">

            <div>
                <div className="dashboard-logo">
                    RENOVA
                </div>

                <nav className="dashboard-nav">

                    <NavLink to="/admin/dashboard">
                        Overview
                    </NavLink>

                    <NavLink to="/admin/renovations">
                        Renovations
                    </NavLink>

                    <NavLink to="/admin/bookings">
                        Bookings
                    </NavLink>

                    <NavLink to="/admin/payments">
                        Payments
                    </NavLink>

                    <NavLink to="/admin/notifications">
                        Notifications
                    </NavLink>

                </nav>
            </div>

            <button
                className="dashboard-logout"
                onClick={handleLogout}
            >
                Logout
            </button>

        </aside>
    )
}

export default AdminSidebar