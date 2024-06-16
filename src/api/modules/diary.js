import axios from '@/plugins/axios'

export default {
  getAll() {
    return axios({
      url: `/diaries`,
      method: 'get'
    })
  },
  getDetail(diaryID) {
    return axios({
      url: `/diaries/${diaryID}`,
      method: 'get'
    })
  },
  getAllByUser(params) {
    return axios({
      url: `/diaries/all`,
      method: 'get',
      params
    })
  },
  create(data) {
    return axios({
      url: '/diaries',
      method: 'post',
      data
    })
  },
  updateDetail(diaryID, data) {
    return axios({
      url: `/diaries/${diaryID}`,
      method: 'patch',
      data
    })
  },
  delete(diaryID) {
    return axios({
      url: `/diaries/${diaryID}`,
      method: 'delete'
    })
  }
}
