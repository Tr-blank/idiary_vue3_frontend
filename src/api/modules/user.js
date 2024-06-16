import axios from '@/plugins/axios'

export default {
  login(data) {
    return axios({
      url: '/users/login',
      method: 'post',
      data
    })
  },
  singUp(data) {
    return axios({
      url: '/users/sign_up',
      method: 'post',
      data
    })
  },
  updatePassword(data) {
    return axios({
      url: '/users/updatePassword',
      method: 'post',
      data
    })
  },
  checkEmailUnique(data) {
    return axios({
      url: '/users/isEmailUnique',
      method: 'post',
      data
    })
  },
  getProfile() {
    return axios({
      url: '/users/profile',
      method: 'get'
    })
  },
  updateProfile(data) {
    return axios({
      url: '/users/profile',
      method: 'patch',
      data
    })
  },
  updateCurrentIdentity(data) {
    return axios({
      url: '/users/currentIdentity',
      method: 'patch',
      data
    })
  }
}
