import { Link } from 'react-router-dom'

function Login() {
    return (
        <div>
            <h1>Login</h1>
            <p>Login to manage your renovation project.</p>

            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default Login