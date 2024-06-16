import axios from '@/plugins/axios'

export default {
  getAll() {
    return axios({
      url: `/identities`,
      method: 'get'
    })
  },
  getDetail(IdentityID) {
    return axios({
      url: `/identities/${IdentityID}`,
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
  updateDetail(IdentityID, data) {
    return axios({
      url: `/identities/${IdentityID}`,
      method: 'patch',
      data
    })
  },
  delete(IdentityID) {
    return axios({
      url: `/identities/${IdentityID}`,
      method: 'delete'
    })
  }
}
