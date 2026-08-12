import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        RENOVA
                    </Link>

                    <p>
                        A renovation management platform for planning, booking,
                        payments, project tracking, and notifications.
                    </p>
                </div>

                <div className="footer-column">
                    <h4>Explore</h4>
                    <a href="#services">Services</a>
                    <a href="#projects">Projects</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#about">About</a>
                </div>

                <div className="footer-column">
                    <h4>Account</h4>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Create Account</Link>
                </div>

                <div className="footer-column">
                    <h4>Renovation</h4>
                    <span>Full Home</span>
                    <span>Kitchen</span>
                    <span>Bathroom</span>
                    <span>Interior & Remodel</span>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 RENOVA. Renovation Management System.</p>
            </div>
        </footer>
    )
}

export default Footer