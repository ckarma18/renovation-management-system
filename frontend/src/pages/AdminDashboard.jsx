import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import api from '../api/axios'

function AdminDashboard() {
    const username = localStorage.getItem('username')
    const navigate = useNavigate()

    const [renovations, setRenovations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchRenovations = async () => {
            try {
                const response = await api.get(
                    '/api/renovations?page=0&size=100&sortBy=id&sortDir=desc'
                )

                const paginationData = response.data.data

                setRenovations(
                    paginationData?.content || []
                )

                setError('')
            } catch (err) {
                console.error(
                    'Failed to load admin renovations:',
                    err
                )

                setError(
                    'Unable to load renovation requests.'
                )
            } finally {
                setLoading(false)
            }
        }

        fetchRenovations()
    }, [])

    const pendingRenovations =
        renovations.filter(
            (renovation) =>
                renovation.status?.toUpperCase() === 'PENDING'
        ).length

    const activeRenovations =
        renovations.filter((renovation) => {
            const status =
                renovation.status?.toUpperCase()

            return (
                status !== 'COMPLETED' &&
                status !== 'CANCELLED' &&
                status !== 'REJECTED'
            )
        }).length

    return (
        <div className="dashboard-layout">

            <AdminSidebar />

            <main className="dashboard-main">

                <header className="dashboard-header">

                    <div>
                        <p className="dashboard-label">
                            ADMIN PORTAL
                        </p>

                        <h1>
                            Welcome back, {username}
                        </h1>

                        <p>
                            Review renovation requests,
                            manage bookings, payments,
                            and customer updates.
                        </p>
                    </div>

                    <button
                        className="dashboard-primary-button"
                        onClick={() =>
                            navigate('/admin/renovations')
                        }
                    >
                        View Renovations
                    </button>

                </header>

                <section className="dashboard-stats">

                    <div className="stat-card">
                        <span>01</span>
                        <p>Total Renovations</p>

                        <h2>
                            {loading
                                ? '...'
                                : renovations.length}
                        </h2>
                    </div>

                    <div className="stat-card">
                        <span>02</span>
                        <p>Pending Reviews</p>

                        <h2>
                            {loading
                                ? '...'
                                : pendingRenovations}
                        </h2>
                    </div>

                    <div className="stat-card">
                        <span>03</span>
                        <p>Active Projects</p>

                        <h2>
                            {loading
                                ? '...'
                                : activeRenovations}
                        </h2>
                    </div>

                    <div className="stat-card">
                        <span>04</span>
                        <p>Bookings</p>
                        <h2>0</h2>
                    </div>

                </section>

                <section className="dashboard-content-card">

                    <p className="dashboard-label">
                        RECENT REQUESTS
                    </p>

                    <h2>
                        Latest renovation requests
                    </h2>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        renovations.length === 0 && (

                            <div className="dashboard-empty">
                                <h3>
                                    No renovation requests
                                </h3>
                            </div>
                        )}

                    {!loading &&
                        !error &&
                        renovations
                            .slice(0, 3)
                            .map((renovation) => (

                                <div
                                    className="admin-recent-item"
                                    key={renovation.id}
                                >
                                    <div>
                                        <strong>
                                            Renovation #
                                            {renovation.id}
                                        </strong>

                                        <p>
                                            {renovation.customerName}
                                            {' — '}
                                            {
                                                renovation.propertyAddress
                                            }
                                        </p>
                                    </div>

                                    <span className="renovation-status pending">
                                        {renovation.status ||
                                            'PENDING'}
                                    </span>
                                </div>

                            ))}

                </section>

            </main>

        </div>
    )
}

export default AdminDashboard