import { useEffect, useState } from 'react'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import api from '../api/axios'

function AdminBookings() {
    const [bookings, setBookings] = useState([])
    const [renovations, setRenovations] = useState([])

    const [formData, setFormData] = useState({
        renovationRequestId: '',
        bookingDate: '',
        bookingTime: '',
    })

    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const fetchBookings = async () => {
        try {
            const response = await api.get('/api/bookings')

            setBookings(response.data.data || [])
        } catch (err) {
            console.error('Failed to load bookings:', err)

            setError('Unable to load bookings.')
        }
    }

    const fetchRenovations = async () => {
        try {
            const response = await api.get(
                '/api/renovations?page=0&size=100&sortBy=id&sortDir=desc'
            )

            const paginationData = response.data.data

            setRenovations(
                paginationData?.content || []
            )
        } catch (err) {
            console.error(
                'Failed to load renovations:',
                err
            )

            setError(
                'Unable to load renovation requests.'
            )
        }
    }

    useEffect(() => {
        const loadPage = async () => {
            setLoading(true)

            await Promise.all([
                fetchBookings(),
                fetchRenovations(),
            ])

            setLoading(false)
        }

        loadPage()
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        setSubmitting(true)
        setError('')
        setSuccessMessage('')

        const requestData = {
            renovationRequestId:
                Number(formData.renovationRequestId),

            bookingDate:
            formData.bookingDate,

            bookingTime:
                `${formData.bookingTime}:00`,
        }

        try {
            const response = await api.post(
                '/api/bookings',
                requestData
            )

            setSuccessMessage(
                response.data.message
            )

            setFormData({
                renovationRequestId: '',
                bookingDate: '',
                bookingTime: '',
            })

            await fetchBookings()

        } catch (err) {
            console.error(
                'Failed to create booking:',
                err
            )

            if (err.response?.data?.message) {
                setError(
                    err.response.data.message
                )
            } else {
                setError(
                    'Unable to create booking.'
                )
            }

        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (bookingId) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this booking?'
        )

        if (!confirmed) {
            return
        }

        setError('')
        setSuccessMessage('')

        try {
            const response = await api.delete(
                `/api/bookings/${bookingId}`
            )

            setBookings((previousBookings) =>
                previousBookings.filter(
                    (booking) =>
                        booking.id !== bookingId
                )
            )

            setSuccessMessage(
                response.data.message
            )

        } catch (err) {
            console.error(
                'Failed to delete booking:',
                err
            )

            if (err.response?.data?.message) {
                setError(
                    err.response.data.message
                )
            } else {
                setError(
                    'Unable to delete booking.'
                )
            }
        }
    }

    const bookedRenovationIds =
        new Set(
            bookings.map(
                (booking) =>
                    booking.renovationRequestId
            )
        )

    const availableRenovations =
        renovations.filter(
            (renovation) =>
                renovation.status === 'APPROVED' &&
                !bookedRenovationIds.has(
                    renovation.id
                )
        )

    return (
        <div className="dashboard-layout">

            <AdminSidebar />

            <main className="dashboard-main">

                <header className="dashboard-header">

                    <div>
                        <p className="dashboard-label">
                            SCHEDULING
                        </p>

                        <h1>
                            Booking Management
                        </h1>

                        <p>
                            Schedule bookings for approved
                            renovation requests and manage
                            existing appointments.
                        </p>
                    </div>

                </header>

                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <section className="dashboard-content-card">

                    <p className="dashboard-label">
                        CREATE BOOKING
                    </p>

                    <h2>
                        Schedule a Renovation
                    </h2>

                    <form
                        className="admin-booking-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">

                            <label htmlFor="renovationRequestId">
                                Approved Renovation
                            </label>

                            <select
                                id="renovationRequestId"
                                name="renovationRequestId"
                                value={
                                    formData.renovationRequestId
                                }
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select renovation
                                </option>

                                {availableRenovations.map(
                                    (renovation) => (

                                        <option
                                            key={renovation.id}
                                            value={renovation.id}
                                        >
                                            Renovation #{renovation.id}
                                            {' — '}
                                            {renovation.customerName}
                                            {' — '}
                                            {renovation.propertyAddress}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                        <div className="two-column-form">

                            <div className="form-group">

                                <label htmlFor="bookingDate">
                                    Booking Date
                                </label>

                                <input
                                    id="bookingDate"
                                    type="date"
                                    name="bookingDate"
                                    value={
                                        formData.bookingDate
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="bookingTime">
                                    Booking Time
                                </label>

                                <input
                                    id="bookingTime"
                                    type="time"
                                    name="bookingTime"
                                    value={
                                        formData.bookingTime
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="dashboard-primary-button"
                            disabled={submitting}
                        >
                            {submitting
                                ? 'Scheduling...'
                                : 'Schedule Booking'}
                        </button>

                    </form>

                </section>

                <section
                    className="dashboard-content-card"
                    style={{ marginTop: '25px' }}
                >

                    <p className="dashboard-label">
                        ALL BOOKINGS
                    </p>

                    <h2>
                        Scheduled Bookings
                    </h2>

                    {loading && (
                        <p>
                            Loading bookings...
                        </p>
                    )}

                    {!loading &&
                        bookings.length === 0 && (

                            <div className="dashboard-empty">

                                <h3>
                                    No bookings scheduled yet
                                </h3>

                                <p>
                                    Approved renovation requests
                                    can be scheduled using the form above.
                                </p>

                            </div>
                        )}

                    {!loading &&
                        bookings.length > 0 && (

                            <div className="booking-list">

                                {bookings.map(
                                    (booking) => (

                                        <article
                                            className="booking-card"
                                            key={booking.id}
                                        >

                                            <div className="booking-card-top">

                                                <div>

                                                    <p className="dashboard-label">
                                                        BOOKING #
                                                        {booking.id}
                                                    </p>

                                                    <h2>
                                                        Renovation #
                                                        {
                                                            booking.renovationRequestId
                                                        }
                                                    </h2>

                                                </div>

                                                <span className="booking-status">
                                                    {
                                                        booking.status ||
                                                        'SCHEDULED'
                                                    }
                                                </span>

                                            </div>

                                            <div className="booking-details">

                                                <div>

                                                    <span>
                                                        Customer
                                                    </span>

                                                    <strong>
                                                        {
                                                            booking.customerName
                                                        }
                                                    </strong>

                                                </div>

                                                <div>

                                                    <span>
                                                        Date
                                                    </span>

                                                    <strong>
                                                        {
                                                            booking.bookingDate
                                                        }
                                                    </strong>

                                                </div>

                                                <div>

                                                    <span>
                                                        Time
                                                    </span>

                                                    <strong>
                                                        {
                                                            booking.bookingTime
                                                        }
                                                    </strong>

                                                </div>

                                                <div>

                                                    <span>
                                                        Renovation
                                                    </span>

                                                    <strong>
                                                        #
                                                        {
                                                            booking.renovationRequestId
                                                        }
                                                    </strong>

                                                </div>

                                            </div>

                                            <div
                                                className="admin-renovation-actions"
                                            >

                                                <button
                                                    type="button"
                                                    className="secondary-dashboard-button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            booking.id
                                                        )
                                                    }
                                                >
                                                    Delete Booking
                                                </button>

                                            </div>

                                        </article>

                                    )
                                )}

                            </div>
                        )}

                </section>

            </main>

        </div>
    )
}

export default AdminBookings