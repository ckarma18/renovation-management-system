import { Link } from 'react-router-dom'

function Hero() {
    return (
        <section className="hero">
            <div className="hero-overlay"></div>

            <div className="hero-content">
                <p className="hero-label">SMART RENOVATION MANAGEMENT</p>

                <h1>
                    Transform Your Space.
                    <span> Build the Home You Imagine.</span>
                </h1>

                <p className="hero-description">
                    Plan, request, book, pay, and manage your renovation project
                    from one simple platform.
                </p>

                <div className="hero-buttons">
                    <Link to="/login" className="primary-button hero-primary">
                        Start Your Renovation
                    </Link>

                    <a href="#services" className="secondary-button">
                        Explore Services
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Hero