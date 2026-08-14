import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import api from '../api/axios'

function CustomerDashboard() {
    const username = localStorage.getItem('username')
    const navigate = useNavigate()

    const [renovations, setRenovations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchRenovations()
    }, [])

    const fetchRenovations = async () => {
        try {
            setLoading(true)

            const response = await api.get('/api/renovations/my')

            setRenovations(response.data.data || [])
            setError('')
        } catch (err) {
            console.error('Failed to load renovations:', err)

            setError('Unable to load your renovation projects.')
        } finally {
            setLoading(false)
        }
    }

    // Count renovations that are not completed/cancelled
    const activeRenovations = renovations.filter((renovation) => {
        const status = renovation.status?.toUpperCase()

        return status !== 'COMPLETED' && status !== 'CANCELLED'
    }).length

    return (
        <div className="dashboard-layout">

            <DashboardSidebar />

            <main className="dashboard-main">

                <header className="dashboard-header">
                    <div>
                        <p className="dashboard-label">
                            CUSTOMER PORTAL
                        </p>

                        <h1>
                            Welcome back, {username}
                        </h1>

                        <p>
                            Manage your renovation projects, bookings,
                            payments and updates in one place.
                        </p>
                    </div>

                    <button
                        className="dashboard-primary-button"
                        onClick={() =>
                            navigate('/customer/renovations/new')
                        }
                    >
                        + Start Renovation
                    </button>
                </header>

                <section className="dashboard-stats">

                    <div className="stat-card">
                        <span>01</span>
                        <p>Active Renovations</p>
                        <h2>{activeRenovations}</h2>
                    </div>

                    <div className="stat-card">
                        <span>02</span>
                        <p>Upcoming Bookings</p>
                        <h2>0</h2>
                    </div>

                    <div className="stat-card">
                        <span>03</span>
                        <p>Pending Payments</p>
                        <h2>0</h2>
                    </div>

                    <div className="stat-card">
                        <span>04</span>
                        <p>Unread Notifications</p>
                        <h2>0</h2>
                    </div>

                </section>

                <section className="dashboard-content-card">

                    <div>
                        <p className="dashboard-label">
                            RECENT ACTIVITY
                        </p>

                        <h2>Your renovation projects</h2>
                    </div>

                    {loading && (
                        <div className="dashboard-empty">
                            <p>Loading renovation projects...</p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="dashboard-empty">
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        renovations.length === 0 && (

                            <div className="dashboard-empty">

                                <h3>
                                    No renovation requests yet
                                </h3>

                                <p>
                                    Start your first renovation project
                                    and manage everything from here.
                                </p>

                                <button
                                    className="dashboard-primary-button"
                                    onClick={() =>
                                        navigate(
                                            '/customer/renovations/new'
                                        )
                                    }
                                >
                                    Start Your First Renovation
                                </button>

                            </div>
                        )}

                    {!loading &&
                        !error &&
                        renovations.length > 0 && (

                            <div className="dashboard-renovation-list">

                                {renovations.slice(0, 3).map(
                                    (renovation) => (

                                        <div
                                            className="dashboard-renovation-item"
                                            key={renovation.id}
                                        >
                                            <div>
                                                <p className="dashboard-label">
                                                    RENOVATION #
                                                    {renovation.id}
                                                </p>

                                                <h3>
                                                    {
                                                        renovation.renovationType
                                                    }
                                                </h3>

                                                <p>
                                                    {
                                                        renovation.propertyAddress
                                                    }
                                                </p>
                                            </div>

                                            <span>
                                                {renovation.status ||
                                                    'PENDING'}
                                            </span>

                                        </div>
                                    )
                                )}

                                <button
                                    className="dashboard-primary-button"
                                    onClick={() =>
                                        navigate(
                                            '/customer/renovations'
                                        )
                                    }
                                >
                                    View All Renovations
                                </button>

                            </div>
                        )}

                </section>

            </main>

        </div>
    )
}

export default CustomerDashboard