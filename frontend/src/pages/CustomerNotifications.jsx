import { useEffect, useState } from 'react'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import api from '../api/axios'

function CustomerNotifications() {

    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [updatingId, setUpdatingId] = useState(null)

    const fetchNotifications = async () => {

        try {

            const response = await api.get(
                '/api/notifications/my'
            )

            setNotifications(
                response.data.data || []
            )

            setError('')

        } catch (err) {

            console.error(
                'Failed to load notifications:',
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

    useEffect(() => {
        fetchNotifications()
    }, [])

    const handleMarkAsRead = async (notificationId) => {

        setUpdatingId(notificationId)
        setError('')

        try {

            const response = await api.patch(
                `/api/notifications/${notificationId}/read`
            )

            const updatedNotification =
                response.data.data

            setNotifications(
                (previousNotifications) =>
                    previousNotifications.map(
                        (notification) =>
                            notification.id === notificationId
                                ? updatedNotification
                                : notification
                    )
            )

        } catch (err) {

            console.error(
                'Failed to mark notification as read:',
                err
            )

            if (err.response?.data?.message) {
                setError(
                    err.response.data.message
                )
            } else {
                setError(
                    'Unable to mark notification as read.'
                )
            }

        } finally {
            setUpdatingId(null)
        }
    }

    const formatDateTime = (createdAt) => {

        if (!createdAt) {
            return ''
        }

        return new Date(createdAt).toLocaleString()
    }

    const unreadCount =
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
                            UPDATES
                        </p>

                        <h1>
                            Notifications
                        </h1>

                        <p>
                            View important updates about
                            bookings, renovation progress,
                            payments, and other project activity.
                        </p>

                    </div>

                    <div className="notification-count-box">

                        <span>
                            Unread
                        </span>

                        <strong>
                            {unreadCount}
                        </strong>

                    </div>

                </header>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {loading && (

                    <section className="dashboard-content-card">
                        <p>
                            Loading notifications...
                        </p>
                    </section>

                )}

                {!loading &&
                    notifications.length === 0 && (

                        <section className="dashboard-content-card">

                            <div className="dashboard-empty">

                                <h3>
                                    No notifications yet
                                </h3>

                                <p>
                                    Important project updates
                                    will appear here.
                                </p>

                            </div>

                        </section>

                    )}

                {!loading &&
                    notifications.length > 0 && (

                        <section className="notification-list">

                            {notifications.map(
                                (notification) => (

                                    <article
                                        key={notification.id}
                                        className={`notification-card ${
                                            notification.read
                                                ? 'read'
                                                : 'unread'
                                        }`}
                                    >

                                        <div className="notification-card-header">

                                            <div>

                                                <p className="dashboard-label">
                                                    {
                                                        notification.read
                                                            ? 'READ'
                                                            : 'NEW'
                                                    }
                                                </p>

                                                <h2>
                                                    {notification.title}
                                                </h2>

                                            </div>

                                            {!notification.read && (

                                                <span className="notification-dot" />

                                            )}

                                        </div>

                                        <p className="notification-message">
                                            {notification.message}
                                        </p>

                                        <div className="notification-footer">

                                            <span>
                                                {
                                                    formatDateTime(
                                                        notification.createdAt
                                                    )
                                                }
                                            </span>

                                            {!notification.read && (

                                                <button
                                                    type="button"
                                                    className="secondary-dashboard-button"
                                                    disabled={
                                                        updatingId ===
                                                        notification.id
                                                    }
                                                    onClick={() =>
                                                        handleMarkAsRead(
                                                            notification.id
                                                        )
                                                    }
                                                >
                                                    {
                                                        updatingId ===
                                                        notification.id
                                                            ? 'Updating...'
                                                            : 'Mark as Read'
                                                    }
                                                </button>

                                            )}

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

export default CustomerNotifications