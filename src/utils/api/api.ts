import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'content-type': 'application/json',
    accept: '*/*',
  },
})

API.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response) {
      // Request made and server responded
      // response: data, status, headers
      return Promise.reject(error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error)
    }
  }
)

export const setProviderApiAuthorization = idToken => {
  API.defaults.headers.common['Authorization'] = `Bearer ${idToken}`
}

const apiList = {
  loginAPI: (user: any) => API.post(`/login`, user),
  registerAPI: (user: any) => API.post(`/register`, user),
  // resetPasswordAPI: (email: string) => API.post(`/auth/reset-password`, { email }),
  // forgotPassword: (password: string) => API.post('/auth/forgot-password', { password }),
  // updateUser: (user: any) => API.patch('/user/update', user),
  // getAllVouchers: () => API.get(`/voucher/all`),
  // getUsers: () => API.get(`/user`),
  // getUsersByEmails: (address: string) => API.get('/token/gettx', { params: { address } }),
}

export default apiList
