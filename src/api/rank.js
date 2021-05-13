import jsonp from "common/js/jsonp";
import axios from "axios"
import {commonParams, options} from "./config";

export function getTopLists() {
  const url = 'http://121.43.135.80:5000/getTopLists'
  return axios.get(url).then(res => {
    return Promise.resolve(res.data.response)
  }).catch(err => {
    console.log(err)
  })
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })

  return jsonp(url, data, options)
}
