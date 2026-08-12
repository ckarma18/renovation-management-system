import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo">
                    RENOVA
                </Link>

                <nav className="nav-links">
                    <Link to="/">Home</Link>
                    <a href="#services">Services</a>
                    <a href="#projects">Projects</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#about">About</a>
                </nav>

                <div className="nav-actions">
                    <Link to="/login" className="login-link">
                        Login
                    </Link>

                    <Link to="/login" className="primary-button">
                        Start Renovation
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar