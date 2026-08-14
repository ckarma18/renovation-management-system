import { NavLink, useNavigate } from 'react-router-dom'

function DashboardSidebar() {
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

                    <NavLink to="/customer/dashboard">
                        Overview
                    </NavLink>

                    <NavLink to="/customer/renovations">
                        My Renovations
                    </NavLink>

                    <NavLink to="/customer/bookings">
                        Bookings
                    </NavLink>

                    <NavLink to="/customer/payments">
                        Payments
                    </NavLink>

                    <NavLink to="/customer/notifications">
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

export default DashboardSidebar