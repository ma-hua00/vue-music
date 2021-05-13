import axios from "axios";

export function getSongPlayUrl(list) {
  let midList = []
  list.forEach(item => {
    midList.push(item.mid)
  })
  let mids = midList.join(',')

  const url = 'http://121.43.135.80:5000/getMusicPlay'
  const data = {
    songmid: mids
  }
  if (mids) {
    axios.get(url, {
      params: data
    }).then(res => {
      list.forEach(item => {
        item.url = res.data.data.playUrl[item.mid].url
      })
    }).catch(err => {
      console.log(err)
    })
  }
  return list
}

//获取歌词
export function getLyric(mid) {
  const url = 'http://121.43.135.80:5000/getLyric'
  const data = {
    songmid: mid
  }
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data.response.lyric)
  }).catch(err => {
    console.log(err)
  })
}





