import axios from "axios";

export function getHotKey() {
  const url = 'http://121.43.135.80:5000/getHotkey'
  return axios.get(url).then(res => {
    return Promise.resolve(res.data.response)
  }).catch(err => {
    console.log(err)
  })
}

export function search(query, page, limit) {
  const url = 'http://121.43.135.80:5000/getSearchByKey'
  const data = {
    key: query,
    page: page,
    limit: limit
  }
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data.response)
  }).catch(err => {
    console.log(err)
  })
}
