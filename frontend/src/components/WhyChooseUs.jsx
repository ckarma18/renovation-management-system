import { Link } from 'react-router-dom'

const benefits = [
    {
        number: '01',
        title: 'Everything in One Place',
        description:
            'Manage renovation requests, bookings, payments, project updates, and notifications from one platform.',
    },
    {
        number: '02',
        title: 'Clear Project Process',
        description:
            'Follow your renovation from the initial request through review, booking, payment, progress, and completion.',
    },
    {
        number: '03',
        title: 'Flexible Renovation Options',
        description:
            'Plan anything from a single-room upgrade to a complete property renovation or remodel.',
    },
    {
        number: '04',
        title: 'Stay Updated',
        description:
            'Receive notifications about important changes, bookings, payments, and renovation progress.',
    },
]

function WhyChooseUs() {
    return (
        <>
            <section className="why-section">
                <div className="why-container">

                    <div className="why-heading">
                        <p className="section-label">WHY CHOOSE US</p>

                        <h2>
                            Renovation management
                            <span> made simpler.</span>
                        </h2>
                    </div>

                    <div className="benefits-grid">
                        {benefits.map((benefit) => (
                            <article className="benefit-card" key={benefit.number}>
                                <span>{benefit.number}</span>

                                <h3>{benefit.title}</h3>

                                <p>{benefit.description}</p>
                            </article>
                        ))}
                    </div>

                </div>
            </section>

            <section className="cta-section">
                <div className="cta-content">
                    <p>READY TO TRANSFORM YOUR SPACE?</p>

                    <h2>
                        Your renovation journey
                        <span> starts here.</span>
                    </h2>

                    <p className="cta-description">
                        Tell us what you want to renovate and start managing your project
                        from one simple platform.
                    </p>

                    <Link to="/login" className="cta-button">
                        Start Your Renovation
                        <span>→</span>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default WhyChooseUs