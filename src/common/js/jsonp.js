import originJSONP from 'jsonp'

//jsonp的封装

export default function jsonp(url,data,option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + parama(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err,data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
function parama(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    //`这个符号是es6语法模板字符串` ${}里存放的是变量
    //encodeURIComponent()函数 就是将不支持的部分比如中文 ?等进行转义
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
