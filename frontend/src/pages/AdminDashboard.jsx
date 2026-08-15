import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import api from '../api/axios'

function AdminDashboard() {
    const username = localStorage.getItem('username')
    const navigate = useNavigate()

    const [renovations, setRenovations] = useState([])
    const [bookings, setBookings] = useState([])
    const [payments, setPayments] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true)
                setError('')

                const [
                    renovationsResponse,
                    bookingsResponse,
                    paymentsResponse,
                ] = await Promise.all([
                    api.get(
                        '/api/renovations?page=0&size=100&sortBy=id&sortDir=desc'
                    ),
                    api.get('/api/bookings'),
                    api.get('/api/payments'),
                ])

                const renovationPage =
                    renovationsResponse.data.data

                setRenovations(
                    renovationPage?.content || []
                )

                setBookings(
                    bookingsResponse.data.data || []
                )

                setPayments(
                    paymentsResponse.data.data || []
                )

            } catch (err) {
                console.error(
                    'Failed to load admin dashboard:',
                    err
                )

                if (err.response?.data?.message) {
                    setError(err.response.data.message)
                } else {
                    setError(
                        'Unable to load dashboard information.'
                    )
                }

            } finally {
                setLoading(false)
            }
        }

        loadDashboard()
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
                status === 'APPROVED' ||
                status === 'IN_PROGRESS'
            )
        }).length

    const totalPayments = payments.reduce(
        (total, payment) =>
            total + Number(payment.amount || 0),
        0
    )

    const formatAmount = (amount) => {
        return `Rs. ${Number(amount).toLocaleString()}`
    }

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

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

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

                        <p>Total Bookings</p>

                        <h2>
                            {loading
                                ? '...'
                                : bookings.length}
                        </h2>

                    </div>

                </section>

                <section
                    className="dashboard-stats"
                    style={{ marginTop: '-20px' }}
                >

                    <div className="stat-card">

                        <span>05</span>

                        <p>Total Payments</p>

                        <h2>
                            {loading
                                ? '...'
                                : payments.length}
                        </h2>

                    </div>

                    <div className="stat-card">

                        <span>06</span>

                        <p>Amount Received</p>

                        <h2>
                            {loading
                                ? '...'
                                : formatAmount(totalPayments)}
                        </h2>

                    </div>

                </section>

                <section className="dashboard-content-card">

                    <p className="dashboard-label">
                        RECENT REQUESTS
                    </p>

                    <h2>
                        Latest renovation requests
                    </h2>

                    {loading && (
                        <div className="dashboard-empty">
                            <p>
                                Loading renovation requests...
                            </p>
                        </div>
                    )}

                    {!loading &&
                        renovations.length === 0 && (

                            <div className="dashboard-empty">

                                <h3>
                                    No renovation requests
                                </h3>

                            </div>

                        )}

                    {!loading &&
                        renovations.length > 0 && (

                            <div>

                                {renovations
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
                                                    {
                                                        renovation.customerName
                                                    }
                                                    {' — '}
                                                    {
                                                        renovation.propertyAddress
                                                    }
                                                </p>

                                            </div>

                                            <span
                                                className={`renovation-status ${
                                                    renovation.status
                                                        ?.toLowerCase() ||
                                                    'pending'
                                                }`}
                                            >
                                                {
                                                    renovation.status ||
                                                    'PENDING'
                                                }
                                            </span>

                                        </div>

                                    ))}

                                <button
                                    className="dashboard-primary-button"
                                    onClick={() =>
                                        navigate(
                                            '/admin/renovations'
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

export default AdminDashboard