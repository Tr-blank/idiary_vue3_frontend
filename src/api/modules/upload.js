import axios from '@/plugins/axios'

export default {
  postAvatar(data) {
    return axios({
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: '/upload/avatar',
      method: 'post',
      data
    })
  },
  postPhoto(data) {
    return axios({
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: '/upload/photo',
      method: 'post',
      data
    })
  }
}
