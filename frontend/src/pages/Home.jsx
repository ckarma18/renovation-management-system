import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <h1>Renovation Management System</h1>
            <p>Transform your space into something extraordinary.</p>

            <Link to="/login">Go to Login</Link>
        </div>
    )
}

export default Home