import axios from '@/plugins/axios'

export default {
  login(data) {
    return axios({
      url: '/users/login',
      method: 'post',
      data
    })
  }
}
