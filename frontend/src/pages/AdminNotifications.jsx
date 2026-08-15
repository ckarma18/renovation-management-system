import { useEffect, useState } from 'react'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import api from '../api/axios'

function AdminNotifications() {

    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {

        const fetchNotifications = async () => {

            try {

                const response = await api.get(
                    '/api/notifications'
                )

                setNotifications(
                    response.data.data || []
                )

                setError('')

            } catch (err) {

                console.error(
                    'Failed to load admin notifications:',
                    err
                )

                if (err.response?.data?.message) {

                    setError(
                        err.response.data.message
                    )

                } else {

                    setError(
                        'Unable to load notifications.'
                    )
                }

            } finally {

                setLoading(false)
            }
        }

        fetchNotifications()

    }, [])

    const formatDateTime = (dateTime) => {

        if (!dateTime) {
            return 'Not available'
        }

        const date = new Date(dateTime)

        if (Number.isNaN(date.getTime())) {
            return dateTime
        }

        return date.toLocaleString()
    }

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length

    return (

        <div className="dashboard-layout">

            <AdminSidebar />

            <main className="dashboard-main">

                <header className="dashboard-header">

                    <div>

                        <p className="dashboard-label">
                            SYSTEM UPDATES
                        </p>

                        <h1>
                            Notifications
                        </h1>

                        <p>
                            View notifications generated for
                            renovation customers.
                        </p>

                    </div>

                    <div className="notification-summary">

                        <span>
                            Unread Customer Notifications
                        </span>

                        <strong>
                            {loading ? '...' : unreadCount}
                        </strong>

                    </div>

                </header>


                {loading && (

                    <section className="dashboard-content-card">

                        <p>
                            Loading notifications...
                        </p>

                    </section>
                )}


                {!loading && error && (

                    <section className="dashboard-content-card">

                        <p>
                            {error}
                        </p>

                    </section>
                )}


                {!loading &&
                    !error &&
                    notifications.length === 0 && (

                        <section className="dashboard-content-card">

                            <div className="dashboard-empty">

                                <h3>
                                    No notifications found
                                </h3>

                                <p>
                                    Customer activity notifications
                                    will appear here.
                                </p>

                            </div>

                        </section>
                    )}


                {!loading &&
                    !error &&
                    notifications.length > 0 && (

                        <section className="notification-list">

                            {notifications.map(
                                (notification) => (

                                    <article
                                        className={`notification-card ${
                                            notification.read
                                                ? 'notification-read'
                                                : 'notification-unread'
                                        }`}
                                        key={notification.id}
                                    >

                                        <div className="notification-card-top">

                                            <div>

                                                <p className="dashboard-label">
                                                    {
                                                        notification.read
                                                            ? 'READ'
                                                            : 'UNREAD'
                                                    }
                                                </p>

                                                <h2>
                                                    {
                                                        notification.title
                                                    }
                                                </h2>

                                            </div>

                                            <span
                                                className={`notification-dot ${
                                                    notification.read
                                                        ? 'read'
                                                        : 'unread'
                                                }`}
                                            />

                                        </div>

                                        <p className="notification-message">
                                            {
                                                notification.message
                                            }
                                        </p>

                                        <div className="notification-meta">

                                            <div>

                                                <span>
                                                    Customer Username
                                                </span>

                                                <strong>
                                                    {
                                                        notification.username ||
                                                        'Unknown'
                                                    }
                                                </strong>

                                            </div>

                                            <div>

                                                <span>
                                                    Created
                                                </span>

                                                <strong>
                                                    {formatDateTime(
                                                        notification.createdAt
                                                    )}
                                                </strong>

                                            </div>

                                            <div>

                                                <span>
                                                    Sent
                                                </span>

                                                <strong>
                                                    {
                                                        notification.sent
                                                            ? 'Yes'
                                                            : 'No'
                                                    }
                                                </strong>

                                            </div>

                                        </div>

                                    </article>
                                )
                            )}

                        </section>
                    )}

            </main>

        </div>
    )
}

export default AdminNotifications