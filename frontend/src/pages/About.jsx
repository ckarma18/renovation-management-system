import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function About() {
    return (
        <>
            <Navbar />

            <main className="public-page">

                <section className="public-page-hero">

                    <p className="section-label">
                        ABOUT RENOVA
                    </p>

                    <h1>
                        Renovation management made simpler.
                    </h1>

                    <p>
                        RENOVA is a renovation management platform
                        designed to organize requests, bookings,
                        payments, notifications, and project progress
                        in one system.
                    </p>

                </section>


                <section className="public-section about-intro">

                    <div>

                        <p className="section-label">
                            OUR PURPOSE
                        </p>

                        <h2>
                            Bringing structure to the renovation process.
                        </h2>

                    </div>

                    <div className="about-copy">

                        <p>
                            Renovation projects involve many details:
                            customer information, property requirements,
                            schedules, budgets, approvals, payments, and
                            ongoing communication.
                        </p>

                        <p>
                            RENOVA provides customers with a dedicated
                            portal while administrators manage project
                            requests and activity through a separate
                            management dashboard.
                        </p>

                    </div>

                </section>


                <section className="public-section">

                    <div className="section-heading">

                        <div>
                            <p className="section-label">
                                PLATFORM FEATURES
                            </p>

                            <h2>
                                Everything in one place
                            </h2>
                        </div>

                    </div>


                    <div className="public-card-grid">

                        <article className="public-info-card">
                            <span className="card-number">
                                01
                            </span>

                            <h3>
                                Renovation Requests
                            </h3>

                            <p>
                                Customers can submit detailed renovation
                                requests and follow their project status.
                            </p>
                        </article>


                        <article className="public-info-card">
                            <span className="card-number">
                                02
                            </span>

                            <h3>
                                Booking Management
                            </h3>

                            <p>
                                Approved renovation projects can be
                                scheduled through the administrator portal.
                            </p>
                        </article>


                        <article className="public-info-card">
                            <span className="card-number">
                                03
                            </span>

                            <h3>
                                Secure Payments
                            </h3>

                            <p>
                                Customers can make payments for their
                                own scheduled bookings and view payment history.
                            </p>
                        </article>


                        <article className="public-info-card">
                            <span className="card-number">
                                04
                            </span>

                            <h3>
                                Notifications
                            </h3>

                            <p>
                                Important booking and payment updates
                                are delivered to the customer's account.
                            </p>
                        </article>


                        <article className="public-info-card">
                            <span className="card-number">
                                05
                            </span>

                            <h3>
                                Role-Based Security
                            </h3>

                            <p>
                                Customer and administrator functions
                                are protected using role-based access
                                and JWT authentication.
                            </p>
                        </article>


                        <article className="public-info-card">
                            <span className="card-number">
                                06
                            </span>

                            <h3>
                                Project Tracking
                            </h3>

                            <p>
                                Renovation status and important activity
                                remain accessible throughout the project.
                            </p>
                        </article>

                    </div>

                </section>


                <section className="public-cta">

                    <div>

                        <p className="section-label">
                            GET STARTED
                        </p>

                        <h2>
                            Plan your next renovation with RENOVA.
                        </h2>

                        <p>
                            Create your customer account and submit
                            your first renovation request.
                        </p>

                    </div>

                    <Link
                        to="/register"
                        className="primary-button"
                    >
                        Create Account
                    </Link>

                </section>

            </main>

            <Footer />
        </>
    )
}

export default About