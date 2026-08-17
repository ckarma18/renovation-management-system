import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function HowItWorksPage() {

    const steps = [
        {
            number: '01',
            title: 'Create Your Account',
            description:
                'Register as a customer and securely log in to your RENOVA dashboard.'
        },
        {
            number: '02',
            title: 'Submit a Renovation Request',
            description:
                'Provide your contact details, property information, renovation type, preferred areas, date, budget, and project description.'
        },
        {
            number: '03',
            title: 'Admin Reviews Your Request',
            description:
                'The administrator reviews the submitted renovation details and updates the project status.'
        },
        {
            number: '04',
            title: 'Booking Is Scheduled',
            description:
                'After approval, the administrator schedules a renovation booking with a date and time.'
        },
        {
            number: '05',
            title: 'View Your Booking',
            description:
                'The scheduled appointment appears automatically inside your customer dashboard.'
        },
        {
            number: '06',
            title: 'Complete Payment',
            description:
                'Pay for the scheduled booking and keep the payment record available in your payment history.'
        },
        {
            number: '07',
            title: 'Receive Notifications',
            description:
                'Stay informed when important events such as booking creation and payment completion occur.'
        },
        {
            number: '08',
            title: 'Track Project Progress',
            description:
                'Follow renovation status updates until the project reaches completion.'
        }
    ]

    return (
        <>
            <Navbar />

            <main className="public-page">

                <section className="public-page-hero">

                    <p className="section-label">
                        HOW IT WORKS
                    </p>

                    <h1>
                        A simple process from renovation request to completion.
                    </h1>

                    <p>
                        RENOVA keeps customers and administrators connected
                        throughout the complete renovation workflow.
                    </p>

                    <Link
                        to="/register"
                        className="primary-button"
                    >
                        Start Now
                    </Link>

                </section>


                <section className="public-section">

                    <div className="section-heading">

                        <div>
                            <p className="section-label">
                                THE PROCESS
                            </p>

                            <h2>
                                Your renovation journey
                            </h2>
                        </div>

                        <p>
                            Each stage is managed through the platform
                            so project information remains organized
                            in one place.
                        </p>

                    </div>


                    <div className="process-grid">

                        {steps.map((step) => (

                            <article
                                className="process-card"
                                key={step.number}
                            >

                                <span className="process-number">
                                    {step.number}
                                </span>

                                <h3>
                                    {step.title}
                                </h3>

                                <p>
                                    {step.description}
                                </p>

                            </article>

                        ))}

                    </div>

                </section>


                <section className="public-cta">

                    <div>
                        <p className="section-label">
                            START YOUR JOURNEY
                        </p>

                        <h2>
                            Your renovation starts with one request.
                        </h2>

                        <p>
                            Create an account and submit your first
                            renovation project.
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

export default HowItWorksPage