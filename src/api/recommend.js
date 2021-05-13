import jsonp from 'common/js/jsonp'
import {commonParams,options} from "./config";
import axios from "axios";

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  //Object.assign Object.assign方法用于对象的合并，将源对象的所有可枚举属性，复制到目标对象
  //Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
  const data = Object.assign({},commonParams,{
    platform: 'h5',
    uin: 0,
    needNewcode: 1
  })

  return jsonp(url,data,options)
}

//请求歌单数据
export function getSongList() {
  const url = 'http://121.43.135.80:5000/getSongLists'
  const data = {
    categoryId: 10000000
  }
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data.response)
  }).catch(err => {
    console.log(err)
  })
}

