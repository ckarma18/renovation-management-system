import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CustomerDashboard from './pages/CustomerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import CustomerRenovations from './pages/CustomerRenovations'
import NewRenovation from './pages/NewRenovation'
import CustomerBookings from './pages/CustomerBookings'
import AdminRenovations from './pages/AdminRenovations'
import AdminBookings from './pages/AdminBookings'
import CustomerNotifications from './pages/CustomerNotifications'
import CustomerPayments from './pages/CustomerPayments'
import AdminPayments from './pages/AdminPayments'
import NotFound from './pages/NotFound'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
                path="/customer/dashboard"
                element={
                    <ProtectedRoute allowedRole="CUSTOMER">
                        <CustomerDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/customer/renovations"
                element={
                    <ProtectedRoute allowedRole="CUSTOMER">
                        <CustomerRenovations />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/customer/renovations/new"
                element={
                    <ProtectedRoute allowedRole="CUSTOMER">
                        <NewRenovation />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/customer/bookings"
                element={
                    <ProtectedRoute allowedRole="CUSTOMER">
                        <CustomerBookings />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/renovations"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <AdminRenovations />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/bookings"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <AdminBookings />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/customer/notifications"
                element={
                    <ProtectedRoute allowedRole="CUSTOMER">
                        <CustomerNotifications />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/customer/payments"
                element={
                    <ProtectedRoute allowedRole="CUSTOMER">
                        <CustomerPayments />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/payments"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <AdminPayments />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}



export default App