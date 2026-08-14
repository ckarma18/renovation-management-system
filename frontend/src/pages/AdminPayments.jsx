import { useEffect, useState } from 'react'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import api from '../api/axios'

function AdminPayments() {
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const fetchPayments = async () => {
        try {
            setLoading(true)

            const response = await api.get('/api/payments')

            setPayments(response.data.data || [])
            setError('')
        } catch (err) {
            console.error('Failed to load payments:', err)

            if (err.response?.data?.message) {
                setError(err.response.data.message)
            } else {
                setError('Unable to load payments.')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPayments()
    }, [])

    const handleDelete = async (paymentId) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this payment record?'
        )

        if (!confirmed) {
            return
        }

        setError('')
        setSuccessMessage('')

        try {
            const response = await api.delete(
                `/api/payments/${paymentId}`
            )

            setPayments((previousPayments) =>
                previousPayments.filter(
                    (payment) => payment.id !== paymentId
                )
            )

            setSuccessMessage(
                response.data?.message ||
                'Payment deleted successfully.'
            )
        } catch (err) {
            console.error('Failed to delete payment:', err)

            if (err.response?.data?.message) {
                setError(err.response.data.message)
            } else {
                setError('Unable to delete payment.')
            }
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

    const totalPaid = payments.reduce(
        (total, payment) =>
            total + Number(payment.amount || 0),
        0
    )

    return (
        <div className="dashboard-layout">

            <AdminSidebar />

            <main className="dashboard-main">

                <header className="dashboard-header">
                    <div>
                        <p className="dashboard-label">
                            FINANCE
                        </p>

                        <h1>Payments</h1>

                        <p>
                            View and manage customer payment records
                            for renovation bookings.
                        </p>
                    </div>
                </header>

                <section className="dashboard-stats">

                    <div className="stat-card">
                        <span>01</span>
                        <p>Total Payments</p>
                        <h2>
                            {loading ? '...' : payments.length}
                        </h2>
                    </div>

                    <div className="stat-card">
                        <span>02</span>
                        <p>Total Amount Received</p>
                        <h2>
                            {loading
                                ? '...'
                                : formatAmount(totalPaid)}
                        </h2>
                    </div>

                    <div className="stat-card">
                        <span>03</span>
                        <p>Paid Records</p>
                        <h2>
                            {loading
                                ? '...'
                                : payments.filter(
                                    (payment) =>
                                        payment.status === 'PAID'
                                ).length}
                        </h2>
                    </div>

                </section>

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

                {loading && (
                    <section className="dashboard-content-card">
                        <p>Loading payments...</p>
                    </section>
                )}

                {!loading && payments.length === 0 && (
                    <section className="dashboard-content-card">

                        <div className="dashboard-empty">
                            <h3>No payments found</h3>

                            <p>
                                Customer payments will appear here
                                once they complete payment for a booking.
                            </p>
                        </div>

                    </section>
                )}

                {!loading && payments.length > 0 && (
                    <section className="payment-list">

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
                                        <span>Customer</span>

                                        <strong>
                                            {payment.customerName}
                                        </strong>
                                    </div>

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
                                            #{payment.renovationRequestId}
                                        </strong>
                                    </div>

                                </div>

                                <div className="payment-date">
                                    Paid on {formatDate(payment.paymentDate)}
                                </div>

                                <div className="admin-renovation-actions">

                                    <button
                                        type="button"
                                        className="secondary-dashboard-button"
                                        onClick={() =>
                                            handleDelete(payment.id)
                                        }
                                    >
                                        Delete Payment
                                    </button>

                                </div>

                            </article>

                        ))}

                    </section>
                )}

            </main>

        </div>
    )
}

export default AdminPayments