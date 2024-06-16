import axios from '@/plugins/axios'

export default {
  getAll() {
    return axios({
      url: `/identities`,
      method: 'get'
    })
  },
  getDetail(identityID) {
    return axios({
      url: `/identities/${identityID}`,
      method: 'get'
    })
  },
  create(data) {
    return axios({
      url: '/identities',
      method: 'post',
      data
    })
  },
  updateDetail(identityID, data) {
    return axios({
      url: `/identities/${identityID}`,
      method: 'patch',
      data
    })
  },
  delete(identityID) {
    return axios({
      url: `/identities/${identityID}`,
      method: 'delete'
    })
  }
}
