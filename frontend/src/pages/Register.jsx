import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        setLoading(true)
        setSuccessMessage('')
        setErrorMessage('')

        try {
            const response = await api.post('/api/auth/register', formData)

            setSuccessMessage(response.data.message)

            setFormData({
                fullName: '',
                username: '',
                email: '',
                password: '',
            })
        } catch (error) {
            console.error(error)

            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('Registration failed. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    return (
        <div className="auth-page">

            <div className="auth-left">
                <Link to="/" className="auth-logo">
                    RENOVA
                </Link>

                <div className="auth-left-content">
                    <p className="auth-label">START YOUR PROJECT</p>

                    <h1>
                        Create your account.
                        <span> Transform your space.</span>
                    </h1>

                    <p>
                        Plan and manage your renovation journey from request
                        to completion.
                    </p>
                </div>
            </div>

            <div className="auth-right">

                <div className="auth-form-container">

                    <Link to="/" className="back-home">
                        ← Back to home
                    </Link>

                    <div className="auth-heading">
                        <p>GET STARTED</p>
                        <h2>Create Account</h2>
                        <span>
              Enter your information to create your RENOVA account.
            </span>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">

                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>

                            <input
                                id="name"
                                type="text"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username</label>

                            <input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Choose a username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                minLength="8"
                                required
                            />
                        </div>

                        {successMessage && (
                            <div className="success-message">
                                {successMessage}
                            </div>
                        )}

                        {errorMessage && (
                            <div className="error-message">
                                {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                            {!loading && <span>→</span>}
                        </button>

                    </form>

                    <p className="auth-switch">
                        Already have an account?
                        <Link to="/login"> Login</Link>
                    </p>

                </div>
            </div>



        </div>
    )
}

export default Register