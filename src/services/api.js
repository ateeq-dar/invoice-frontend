import axios from 'axios'

const base = import.meta.env.VITE_API_BASE || 'http://localhost:4000'
const api = axios.create({ baseURL: base, timeout: 10000 })

api.interceptors.response.use(
  r => r,
  err => {
    const data = err.response?.data
    return Promise.reject({
      message: data?.error?.message || err.message,
      code: data?.error?.code || 'NETWORK_ERROR',
      status: err.response?.status
    })
  }
)

export const setAuthToken = token => {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete api.defaults.headers.common['Authorization']
}

export const authSignIn = (email, password) => api.post('/api/auth/signin', { email, password }).then(r => r.data)
export const authSignUp = (email, password) => api.post('/api/auth/signup', { email, password }).then(r => r.data)
export const authMe = () => api.get('/api/auth/me').then(r => r.data)

export const getInvoice = id => api.get(`/api/invoices/${id}`).then(r => r.data)
export const addPayment = (id, amount) => api.post(`/api/invoices/${id}/payments`, { amount }).then(r => r.data)
export const archiveInvoice = id => api.post(`/api/invoices/${id}/archive`).then(r => r.data)
export const restoreInvoice = id => api.post(`/api/invoices/${id}/restore`).then(r => r.data)

export default api
