import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, allowedRole }) {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (!token) {
        return <Navigate to="/login" replace />
    }

    if (allowedRole && role !== allowedRole) {
        if (role === 'ADMIN') {
            return <Navigate to="/admin/dashboard" replace />
        }

        if (role === 'CUSTOMER') {
            return <Navigate to="/customer/dashboard" replace />
        }

        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute