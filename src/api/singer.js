import jsonp from "common/js/jsonp";
import {commonParams,options} from "./config";
import axios from "axios";

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({},commonParams,{
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1664029744
  })
  return jsonp(url,data,options)
}
export function getSingerDetail(id) {
  const url = 'http://121.43.135.80:5000/getSingerHotsong'
  const data = {
    limit: 100,
    singermid: id
  }
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data.response)
  }).catch(err => {
    return console.log(err)
  })
}
