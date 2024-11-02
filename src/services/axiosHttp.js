import { apiServer } from '../globalVars.js'
import axios from 'axios'

function createAxios() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'))
  const headers = {}
  if (user && user.token) {
    headers.Authorization = user.token
  }
  const instance = axios.create({
    baseURL: apiServer,
    headers,
  })

  instance.interceptors.response.use(
    response =>
      Promise.resolve({
        data: response.data,
        headers: response.headers,
      }),
    error => {
      if (error.response) {
        if ([401].includes(error.response.status)) {
          localStorage.removeItem('user')
          location.reload(true)
        } else if ([403].includes(error.response.status)) {
          location.hash = '#/inventory/forbidden'
        }
        return Promise.reject(error.response.data)
      } else {
        return Promise.reject('Error al acceder a los servicios API')
      }
    },
  )
  return instance
}

export default createAxios
