import axios from "axios"

export function getDiscDetail(id) {
  const url = 'http://121.43.135.80:5000/getSongListDetail'
  const data = {
    disstid: id
  }
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data.response)
  }).catch(err => {
    return console.log(err)
  })
}
