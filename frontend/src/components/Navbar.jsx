import { Link, useLocation } from 'react-router-dom'

function Navbar() {

    const location = useLocation()

    const isHomePage = location.pathname === '/'

    return (
        <header
            className={
                isHomePage
                    ? 'navbar'
                    : 'navbar navbar-solid'
            }
        >
            <div className="navbar-container">

                <Link to="/" className="logo">
                    RENOVA
                </Link>

                <nav className="nav-links">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/services">
                        Services
                    </Link>

                    <Link to="/projects">
                        Projects
                    </Link>

                    <Link to="/how-it-works">
                        How It Works
                    </Link>

                    <Link to="/about">
                        About
                    </Link>

                </nav>

                <div className="nav-actions">

                    <Link
                        to="/login"
                        className="login-link"
                    >
                        Login
                    </Link>

                    <Link
                        to="/login"
                        className="primary-button"
                    >
                        Start Renovation
                    </Link>

                </div>

            </div>
        </header>
    )
}

export default Navbar