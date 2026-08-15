import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080',
})

/*
 * REQUEST INTERCEPTOR
 * Adds the JWT token before sending protected API requests.
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        const tokenType =
            localStorage.getItem('tokenType') || 'Bearer'

        if (token) {
            config.headers.Authorization =
                `${tokenType} ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

/*
 * RESPONSE INTERCEPTOR
 * If Spring Boot returns 401, the login session
 * is no longer valid.
 */
api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem('token')
            localStorage.removeItem('tokenType')
            localStorage.removeItem('username')
            localStorage.removeItem('role')

            /*
             * Avoid redirecting repeatedly if the user
             * is already on the login page.
             */
            if (
                window.location.pathname !== '/login'
            ) {
                window.location.href = '/login'
            }
        }

        return Promise.reject(error)
    }
)

export default api