import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 10000
})

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

export const getInvoice = id => api.get(`/api/invoices/${id}`).then(r => r.data)
export const addPayment = (id, amount) => api.post(`/api/invoices/${id}/payments`, { amount }).then(r => r.data)
export const archiveInvoice = id => api.post(`/api/invoices/${id}/archive`).then(r => r.data)
export const restoreInvoice = id => api.post(`/api/invoices/${id}/restore`).then(r => r.data)

export default api
