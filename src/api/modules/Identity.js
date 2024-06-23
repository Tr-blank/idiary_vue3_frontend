import axios from '@/plugins/axios'

export default {
  getPublicList() {
    return axios({
      url: `/identities/public`,
      method: 'get'
    })
  },
  getDetail(identityID) {
    return axios({
      url: `/identities/public/${identityID}`,
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
