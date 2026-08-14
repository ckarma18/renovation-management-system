import { useEffect, useState } from 'react'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import api from '../api/axios'

function CustomerPayments() {
    const [bookings, setBookings] = useState([])
    const [payments, setPayments] = useState([])

    const [formData, setFormData] = useState({
        bookingId: '',
        amount: '',
        paymentMethod: '',
    })

    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const fetchBookings = async () => {
        const response = await api.get('/api/bookings/my')
        setBookings(response.data.data || [])
    }

    const fetchPayments = async () => {
        const response = await api.get('/api/payments/my')
        setPayments(response.data.data || [])
    }

    useEffect(() => {
        const loadPage = async () => {
            try {
                setLoading(true)
                setError('')

                await Promise.all([
                    fetchBookings(),
                    fetchPayments(),
                ])
            } catch (err) {
                console.error('Failed to load payments:', err)

                if (err.response?.data?.message) {
                    setError(err.response.data.message)
                } else {
                    setError('Unable to load payment information.')
                }
            } finally {
                setLoading(false)
            }
        }

        loadPage()
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        setSubmitting(true)
        setError('')
        setSuccessMessage('')

        const requestData = {
            amount: Number(formData.amount),
            paymentMethod: formData.paymentMethod,
            bookingId: Number(formData.bookingId),
        }

        try {
            const response = await api.post(
                '/api/payments',
                requestData
            )

            setSuccessMessage(
                response.data?.message ||
                'Payment completed successfully.'
            )

            setFormData({
                bookingId: '',
                amount: '',
                paymentMethod: '',
            })

            await fetchPayments()

        } catch (err) {
            console.error('Payment failed:', err)

            if (err.response?.data?.message) {
                setError(err.response.data.message)
            } else {
                setError(
                    'Unable to complete payment. Please try again.'
                )
            }

        } finally {
            setSubmitting(false)
        }
    }

    const formatAmount = (amount) => {
        if (amount === null || amount === undefined) {
            return 'Rs. 0'
        }

        return `Rs. ${Number(amount).toLocaleString()}`
    }

    const formatDate = (paymentDate) => {
        if (!paymentDate) {
            return ''
        }

        return new Date(paymentDate).toLocaleString()
    }

    /*
     * A booking should disappear from the payment dropdown
     * after it already has a payment.
     */
    const paidBookingIds = new Set(
        payments.map((payment) => payment.bookingId)
    )

    const unpaidBookings = bookings.filter(
        (booking) => !paidBookingIds.has(booking.id)
    )

    return (
        <div className="dashboard-layout">

            <DashboardSidebar />

            <main className="dashboard-main">

                <header className="dashboard-header">

                    <div>
                        <p className="dashboard-label">
                            BILLING
                        </p>

                        <h1>Payments</h1>

                        <p>
                            Make payments for your scheduled renovation
                            bookings and view your payment history.
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

                {/* PAYMENT FORM */}

                <section className="dashboard-content-card">

                    <p className="dashboard-label">
                        MAKE PAYMENT
                    </p>

                    <h2>Pay for a Booking</h2>

                    {loading ? (
                        <p>Loading booking information...</p>
                    ) : unpaidBookings.length === 0 ? (

                        <div className="payment-empty">
                            <p>
                                You currently have no unpaid bookings.
                            </p>
                        </div>

                    ) : (

                        <form
                            className="customer-payment-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="form-group">

                                <label htmlFor="bookingId">
                                    Booking
                                </label>

                                <select
                                    id="bookingId"
                                    name="bookingId"
                                    value={formData.bookingId}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select booking
                                    </option>

                                    {unpaidBookings.map((booking) => (

                                        <option
                                            key={booking.id}
                                            value={booking.id}
                                        >
                                            Booking #{booking.id}
                                            {' — '}
                                            Renovation #
                                            {booking.renovationRequestId}
                                            {' — '}
                                            {booking.bookingDate}
                                        </option>

                                    ))}

                                </select>

                            </div>

                            <div className="two-column-form">

                                <div className="form-group">

                                    <label htmlFor="amount">
                                        Amount (Rs.)
                                    </label>

                                    <input
                                        id="amount"
                                        type="number"
                                        name="amount"
                                        min="1"
                                        step="0.01"
                                        placeholder="Enter payment amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="paymentMethod">
                                        Payment Method
                                    </label>

                                    <select
                                        id="paymentMethod"
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select payment method
                                        </option>

                                        <option value="CASH">
                                            Cash
                                        </option>

                                        <option value="BANK_TRANSFER">
                                            Bank Transfer
                                        </option>

                                        <option value="CARD">
                                            Card
                                        </option>

                                        <option value="ESEWA">
                                            eSewa
                                        </option>

                                        <option value="KHALTI">
                                            Khalti
                                        </option>

                                    </select>

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="dashboard-primary-button"
                                disabled={submitting}
                            >
                                {submitting
                                    ? 'Processing...'
                                    : 'Complete Payment'}
                            </button>

                        </form>

                    )}

                </section>

                {/* PAYMENT HISTORY */}

                <section
                    className="dashboard-content-card"
                    style={{ marginTop: '25px' }}
                >

                    <p className="dashboard-label">
                        PAYMENT HISTORY
                    </p>

                    <h2>My Payments</h2>

                    {!loading && payments.length === 0 && (

                        <div className="dashboard-empty">

                            <h3>No payments yet</h3>

                            <p>
                                Completed payments will appear here.
                            </p>

                        </div>

                    )}

                    {!loading && payments.length > 0 && (

                        <div className="payment-list">

                            {payments.map((payment) => (

                                <article
                                    className="payment-card"
                                    key={payment.id}
                                >

                                    <div className="payment-card-top">

                                        <div>

                                            <p className="dashboard-label">
                                                PAYMENT #{payment.id}
                                            </p>

                                            <h2>
                                                {formatAmount(
                                                    payment.amount
                                                )}
                                            </h2>

                                        </div>

                                        <span className="payment-status">
                                            {payment.status || 'PAID'}
                                        </span>

                                    </div>

                                    <div className="payment-details">

                                        <div>
                                            <span>Method</span>

                                            <strong>
                                                {payment.paymentMethod}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Booking</span>

                                            <strong>
                                                #{payment.bookingId}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Renovation</span>

                                            <strong>
                                                #
                                                {payment.renovationRequestId}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Customer</span>

                                            <strong>
                                                {payment.customerName}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="payment-date">
                                        Paid on{' '}
                                        {formatDate(
                                            payment.paymentDate
                                        )}
                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    )
}

export default CustomerPayments