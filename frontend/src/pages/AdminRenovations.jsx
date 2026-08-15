import { useEffect, useState } from 'react'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import api from '../api/axios'

function AdminRenovations() {

    const [renovations, setRenovations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [updatingId, setUpdatingId] = useState(null)

    const fetchRenovations = async () => {

        try {

            setLoading(true)

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
                'Failed to load renovations:',
                err
            )

            if (err.response?.data?.message) {
                setError(err.response.data.message)
            } else {
                setError(
                    'Unable to load renovation requests.'
                )
            }

        } finally {

            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRenovations()
    }, [])

    const handleStatusChange = async (
        renovation,
        newStatus
    ) => {

        setUpdatingId(renovation.id)
        setSuccessMessage('')
        setError('')

        /*
         * IMPORTANT:
         * Send every renovation field back to the backend.
         * Otherwise changing only the status could remove
         * the structured renovation information.
         */
        const requestData = {

            customerName:
            renovation.customerName,

            phoneNumber:
            renovation.phoneNumber,

            propertyAddress:
            renovation.propertyAddress,

            renovationType:
            renovation.renovationType,

            propertyType:
            renovation.propertyType,

            renovationAreas:
            renovation.renovationAreas,

            preferredDate:
            renovation.preferredDate,

            description:
            renovation.description,

            estimatedBudget:
            renovation.estimatedBudget,

            status: newStatus
        }

        try {

            const response = await api.put(
                `/api/renovations/${renovation.id}`,
                requestData
            )

            const updatedRenovation =
                response.data.data

            setRenovations((previousRenovations) =>
                previousRenovations.map((item) =>
                    item.id === renovation.id
                        ? updatedRenovation
                        : item
                )
            )

            setSuccessMessage(
                `Renovation #${renovation.id} updated to ${newStatus}.`
            )

        } catch (err) {

            console.error(
                'Failed to update renovation:',
                err
            )

            if (err.response?.data?.message) {

                setError(
                    err.response.data.message
                )

            } else {

                setError(
                    'Unable to update renovation status.'
                )
            }

        } finally {

            setUpdatingId(null)
        }
    }

    const formatBudget = (budget) => {

        if (
            budget === null ||
            budget === undefined
        ) {
            return 'Not specified'
        }

        return `Rs. ${Number(
            budget
        ).toLocaleString()}`
    }

    const formatDate = (date) => {

        if (!date) {
            return 'Not specified'
        }

        const parsedDate =
            new Date(`${date}T00:00:00`)

        if (Number.isNaN(parsedDate.getTime())) {
            return date
        }

        return parsedDate.toLocaleDateString(
            'en-US',
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
        )
    }

    const formatRenovationType = (type) => {

        if (!type) {
            return 'Renovation Project'
        }

        return type
            .replaceAll('_', ' ')
            .toLowerCase()
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            )
    }

    const formatPropertyType = (type) => {

        if (!type) {
            return 'Not specified'
        }

        return type
            .replaceAll('_', ' ')
            .toLowerCase()
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            )
    }

    const formatAreas = (areas) => {

        if (!areas) {
            return 'Not specified'
        }

        if (Array.isArray(areas)) {

            if (areas.length === 0) {
                return 'Not specified'
            }

            return areas.join(', ')
        }

        return areas
    }

    return (

        <div className="dashboard-layout">

            <AdminSidebar />

            <main className="dashboard-main">

                {/* PAGE HEADER */}

                <header className="dashboard-header">

                    <div>

                        <p className="dashboard-label">
                            PROJECT MANAGEMENT
                        </p>

                        <h1>
                            Renovation Requests
                        </h1>

                        <p>
                            Review customer requests and
                            manage their renovation status.
                        </p>

                    </div>

                </header>


                {/* SUCCESS MESSAGE */}

                {successMessage && (

                    <div className="success-message">

                        {successMessage}

                    </div>
                )}


                {/* ERROR MESSAGE */}

                {error && (

                    <div className="error-message">

                        {error}

                    </div>
                )}


                {/* LOADING */}

                {loading && (

                    <section className="dashboard-content-card">

                        <p>
                            Loading renovation requests...
                        </p>

                    </section>
                )}


                {/* EMPTY STATE */}

                {!loading &&
                    renovations.length === 0 && (

                        <section className="dashboard-content-card">

                            <div className="dashboard-empty">

                                <h3>
                                    No renovation requests found
                                </h3>

                            </div>

                        </section>
                    )}


                {/* RENOVATION LIST */}

                {!loading &&
                    renovations.length > 0 && (

                        <section className="renovation-list">

                            {renovations.map(
                                (renovation) => (

                                    <article
                                        className="renovation-card"
                                        key={renovation.id}
                                    >

                                        {/* TOP */}

                                        <div className="renovation-card-top">

                                            <div>

                                                <p className="dashboard-label">
                                                    RENOVATION #
                                                    {renovation.id}
                                                </p>

                                                <h2>
                                                    {formatRenovationType(
                                                        renovation.renovationType
                                                    )}
                                                </h2>

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


                                        {/* PROJECT INFORMATION */}

                                        <div className="renovation-details">

                                            <div>

                                                <span>
                                                    Property Type
                                                </span>

                                                <strong>
                                                    {formatPropertyType(
                                                        renovation.propertyType
                                                    )}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Renovation Areas
                                                </span>

                                                <strong>
                                                    {formatAreas(
                                                        renovation.renovationAreas
                                                    )}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Preferred Date
                                                </span>

                                                <strong>
                                                    {formatDate(
                                                        renovation.preferredDate
                                                    )}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Estimated Budget
                                                </span>

                                                <strong>
                                                    {formatBudget(
                                                        renovation.estimatedBudget
                                                    )}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Customer
                                                </span>

                                                <strong>
                                                    {
                                                        renovation.customerName
                                                    }
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Phone
                                                </span>

                                                <strong>
                                                    {
                                                        renovation.phoneNumber
                                                    }
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Property Address
                                                </span>

                                                <strong>
                                                    {
                                                        renovation.propertyAddress
                                                    }
                                                </strong>

                                            </div>

                                        </div>


                                        {/* DESCRIPTION */}

                                        {renovation.description && (

                                            <div className="renovation-description">

                                                <span>
                                                    Description
                                                </span>

                                                <p>
                                                    {
                                                        renovation.description
                                                    }
                                                </p>

                                            </div>
                                        )}


                                        {/* ADMIN STATUS CONTROL */}

                                        <div className="admin-renovation-actions">

                                            <div>

                                                <label
                                                    htmlFor={`status-${renovation.id}`}
                                                >
                                                    Update Status
                                                </label>

                                                <select
                                                    id={`status-${renovation.id}`}
                                                    value={
                                                        renovation.status ||
                                                        'PENDING'
                                                    }
                                                    disabled={
                                                        updatingId ===
                                                        renovation.id
                                                    }
                                                    onChange={(event) =>
                                                        handleStatusChange(
                                                            renovation,
                                                            event.target.value
                                                        )
                                                    }
                                                >

                                                    <option value="PENDING">
                                                        Pending
                                                    </option>

                                                    <option value="APPROVED">
                                                        Approved
                                                    </option>

                                                    <option value="IN_PROGRESS">
                                                        In Progress
                                                    </option>

                                                    <option value="COMPLETED">
                                                        Completed
                                                    </option>

                                                    <option value="REJECTED">
                                                        Rejected
                                                    </option>

                                                    <option value="CANCELLED">
                                                        Cancelled
                                                    </option>

                                                </select>

                                            </div>

                                            {updatingId ===
                                                renovation.id && (

                                                    <span className="status-updating">
                                                        Updating...
                                                    </span>
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

export default AdminRenovations