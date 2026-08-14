import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import api from '../api/axios'


function CustomerRenovations() {

    const navigate = useNavigate()

    const [renovations, setRenovations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {

        const fetchRenovations = async () => {

            try {

                const response = await api.get('/api/renovations/my')

                console.log('Renovation response:', response.data)

                setRenovations(response.data.data || [])

            } catch (err) {

                console.error('Failed to load renovations:', err)

                setError('Unable to load your renovation requests.')

            } finally {

                setLoading(false)
            }
        }

        fetchRenovations()

    }, [])

    const formatBudget = (budget) => {

        if (budget === null || budget === undefined) {
            return 'Not specified'
        }

        return `Rs. ${Number(budget).toLocaleString()}`
    }

    return (

        <div className="dashboard-layout">

            <DashboardSidebar />

            <main className="dashboard-main">

                {/* PAGE HEADER */}

                <header className="dashboard-header">

                    <div>

                        <p className="dashboard-label">
                            MY PROJECTS
                        </p>

                        <h1>My Renovations</h1>

                        <p>
                            View and manage all of your renovation requests.
                        </p>

                    </div>

                    <button
                        className="dashboard-primary-button"
                        onClick={() =>
                            navigate('/customer/renovations/new')
                        }
                    >
                        + New Renovation
                    </button>

                </header>


                {/* LOADING */}

                {loading && (

                    <section className="dashboard-content-card">

                        <p>
                            Loading your renovation requests...
                        </p>

                    </section>

                )}


                {/* ERROR */}

                {!loading && error && (

                    <section className="dashboard-content-card">

                        <p>{error}</p>

                    </section>

                )}


                {/* EMPTY STATE */}

                {!loading &&
                    !error &&
                    renovations.length === 0 && (

                        <section className="dashboard-content-card">

                            <div className="dashboard-empty">

                                <h3>
                                    No renovation requests yet
                                </h3>

                                <p>
                                    Start your first renovation project
                                    and manage everything from here.
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

                        </section>

                    )}


                {/* RENOVATION LIST */}

                {!loading &&
                    !error &&
                    renovations.length > 0 && (

                        <section className="renovation-list">

                            {renovations.map((renovation) => (

                                <article
                                    className="renovation-card"
                                    key={renovation.id}
                                >

                                    <div className="renovation-card-top">

                                        <div>

                                            <p className="dashboard-label">
                                                RENOVATION #{renovation.id}
                                            </p>

                                            <h2>
                                                {renovation.renovationType}
                                            </h2>

                                        </div>

                                        <span
                                            className={`renovation-status ${
                                                renovation.status
                                                    ? renovation.status.toLowerCase()
                                                    : 'pending'
                                            }`}
                                        >
                                            {renovation.status || 'PENDING'}
                                        </span>

                                    </div>


                                    <div className="renovation-details">

                                        <div>

                                            <span>Customer</span>

                                            <strong>
                                                {renovation.customerName}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>Phone</span>

                                            <strong>
                                                {renovation.phoneNumber}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>Property Address</span>

                                            <strong>
                                                {renovation.propertyAddress}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>Estimated Budget</span>

                                            <strong>
                                                {formatBudget(
                                                    renovation.estimatedBudget
                                                )}
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

export default CustomerRenovations