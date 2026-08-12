import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080',
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        const tokenType = localStorage.getItem('tokenType') || 'Bearer'

        if (token) {
            config.headers.Authorization = `${tokenType} ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api