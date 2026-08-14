import { useEffect, useState } from 'react'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import api from '../api/axios'

function CustomerBookings() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get('/api/bookings/my')

                setBookings(response.data.data || [])
                setError('')
            } catch (err) {
                console.error('Failed to load bookings:', err)

                if (err.response?.data?.message) {
                    setError(err.response.data.message)
                } else {
                    setError('Unable to load your bookings.')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchBookings()
    }, [])

    return (
        <div className="dashboard-layout">

            <DashboardSidebar />

            <main className="dashboard-main">

                <header className="dashboard-header">
                    <div>
                        <p className="dashboard-label">
                            MY SCHEDULE
                        </p>

                        <h1>Bookings</h1>

                        <p>
                            View scheduled appointments and renovation bookings
                            created for your projects.
                        </p>
                    </div>
                </header>

                {loading && (
                    <section className="dashboard-content-card">
                        <p>Loading bookings...</p>
                    </section>
                )}

                {!loading && error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {!loading &&
                    !error &&
                    bookings.length === 0 && (
                        <section className="dashboard-content-card">

                            <div className="dashboard-empty">
                                <h3>No bookings scheduled yet</h3>

                                <p>
                                    Once your renovation request is reviewed,
                                    an administrator can schedule a booking for
                                    your project.
                                </p>
                            </div>

                        </section>
                    )}

                {!loading &&
                    !error &&
                    bookings.length > 0 && (
                        <section className="booking-list">

                            {bookings.map((booking) => (
                                <article
                                    className="booking-card"
                                    key={booking.id}
                                >
                                    <div className="booking-card-top">

                                        <div>
                                            <p className="dashboard-label">
                                                BOOKING #{booking.id}
                                            </p>

                                            <h2>
                                                Renovation #{booking.renovationRequestId}
                                            </h2>
                                        </div>

                                        <span className="booking-status">
                                            {booking.status || 'SCHEDULED'}
                                        </span>

                                    </div>

                                    <div className="booking-details">

                                        <div>
                                            <span>Date</span>

                                            <strong>
                                                {booking.bookingDate}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Time</span>

                                            <strong>
                                                {booking.bookingTime}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Customer</span>

                                            <strong>
                                                {booking.customerName}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Renovation</span>

                                            <strong>
                                                #{booking.renovationRequestId}
                                            </strong>
                                        </div>

                                    </div>

                                </article>
                            ))}

                        </section>
                    )}

            </main>

        </div>
    )
}

export default CustomerBookings