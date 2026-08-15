import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import api from '../api/axios'

function CustomerDashboard() {
    const username = localStorage.getItem('username')
    const navigate = useNavigate()

    const [renovations, setRenovations] = useState([])
    const [bookings, setBookings] = useState([])
    const [payments, setPayments] = useState([])
    const [notifications, setNotifications] = useState([])

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
                    notificationsResponse,
                ] = await Promise.all([
                    api.get('/api/renovations/my'),
                    api.get('/api/bookings/my'),
                    api.get('/api/payments/my'),
                    api.get('/api/notifications/my'),
                ])

                setRenovations(
                    renovationsResponse.data.data || []
                )

                setBookings(
                    bookingsResponse.data.data || []
                )

                setPayments(
                    paymentsResponse.data.data || []
                )

                setNotifications(
                    notificationsResponse.data.data || []
                )

            } catch (err) {
                console.error(
                    'Failed to load customer dashboard:',
                    err
                )

                if (err.response?.data?.message) {
                    setError(err.response.data.message)
                } else {
                    setError(
                        'Unable to load your dashboard information.'
                    )
                }

            } finally {
                setLoading(false)
            }
        }

        loadDashboard()
    }, [])

    /*
     * Active renovation:
     * anything that is not finished/cancelled/rejected.
     */
    const activeRenovations =
        renovations.filter((renovation) => {
            const status =
                renovation.status?.toUpperCase()

            return (
                status === 'APPROVED' ||
                status === 'IN_PROGRESS'
            )
        }).length

    /*
     * Upcoming booking:
     * booking is scheduled and the date has not passed.
     */
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const upcomingBookings = bookings.filter(
        (booking) => {
            if (!booking.bookingDate) {
                return false
            }

            const bookingDate =
                new Date(`${booking.bookingDate}T00:00:00`)

            const status =
                booking.status?.toUpperCase()

            return (
                bookingDate >= today &&
                status !== 'CANCELLED'
            )
        }
    ).length

    /*
     * A booking requires payment if we have not received
     * a payment record for that booking yet.
     */
    const paidBookingIds = new Set(
        payments.map(
            (payment) => payment.bookingId
        )
    )

    const pendingPayments = bookings.filter(
        (booking) =>
            !paidBookingIds.has(booking.id)
    ).length

    /*
     * Count notifications whose read field is false.
     */
    const unreadNotifications =
        notifications.filter(
            (notification) => !notification.read
        ).length

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
                            Manage your renovation projects,
                            bookings, payments and updates
                            in one place.
                        </p>
                    </div>

                    <button
                        className="dashboard-primary-button"
                        onClick={() =>
                            navigate(
                                '/customer/renovations/new'
                            )
                        }
                    >
                        + Start Renovation
                    </button>

                </header>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <section className="dashboard-stats">

                    <div
                        className="stat-card"
                        onClick={() =>
                            navigate(
                                '/customer/renovations'
                            )
                        }
                    >
                        <span>01</span>

                        <p>
                            Active Renovations
                        </p>

                        <h2>
                            {loading
                                ? '...'
                                : activeRenovations}
                        </h2>
                    </div>

                    <div
                        className="stat-card"
                        onClick={() =>
                            navigate(
                                '/customer/bookings'
                            )
                        }
                    >
                        <span>02</span>

                        <p>
                            Upcoming Bookings
                        </p>

                        <h2>
                            {loading
                                ? '...'
                                : upcomingBookings}
                        </h2>
                    </div>

                    <div
                        className="stat-card"
                        onClick={() =>
                            navigate(
                                '/customer/payments'
                            )
                        }
                    >
                        <span>03</span>

                        <p>
                            Pending Payments
                        </p>

                        <h2>
                            {loading
                                ? '...'
                                : pendingPayments}
                        </h2>
                    </div>

                    <div
                        className="stat-card"
                        onClick={() =>
                            navigate(
                                '/customer/notifications'
                            )
                        }
                    >
                        <span>04</span>

                        <p>
                            Unread Notifications
                        </p>

                        <h2>
                            {loading
                                ? '...'
                                : unreadNotifications}
                        </h2>
                    </div>

                </section>

                <section className="dashboard-content-card">

                    <div>
                        <p className="dashboard-label">
                            RECENT ACTIVITY
                        </p>

                        <h2>
                            Your renovation projects
                        </h2>
                    </div>

                    {loading && (
                        <div className="dashboard-empty">
                            <p>
                                Loading renovation projects...
                            </p>
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
                                    Start your first renovation
                                    project and manage everything
                                    from here.
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

                                {renovations
                                    .slice(0, 3)
                                    .map((renovation) => (

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