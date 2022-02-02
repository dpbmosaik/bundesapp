import axios from 'axios'
import { getToken } from '@/plugin/keycloak'

export default {
  interceptorsSetup () {
    axios.interceptors.request.use(
      async config => {
        const token = await getToken()
        config.headers = {
          Authorization: `Bearer ${token}`
        }
        return config
      },
      error => {
        Promise.reject(error)
      }
    )
  }
}
