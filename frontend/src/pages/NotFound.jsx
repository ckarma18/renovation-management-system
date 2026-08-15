import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="not-found-page">

            <div className="not-found-content">

                <p className="dashboard-label">
                    404 ERROR
                </p>

                <h1>
                    Page not found
                </h1>

                <p>
                    The page you are looking for does not exist
                    or may have been moved.
                </p>

                <Link
                    to="/"
                    className="dashboard-primary-button"
                >
                    Back to Home
                </Link>

            </div>

        </div>
    )
}

export default NotFound