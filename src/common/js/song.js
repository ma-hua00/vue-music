import {getLyric} from "api/song";

//歌曲类
export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  //创建歌曲是定义一个内部函数来获得歌词
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise(resolve => {
      getLyric(this.mid).then(res => {
        this.lyric = res
        resolve(this.lyric)
      })
    })
  }
}
//创建歌曲类信息
export function createSong(songData) {
  return new Song({
    id: songData.id || songData.songid,
    mid: songData.mid || songData.songmid,
    singer: filterSinger(songData.singer),
    name: songData.name || songData.songname,
    album: songData.album ? songData.album.name : songData.albumname,
    duration: songData.interval,
    image: songData.album ? `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songData.album.mid}.jpg?max_age=2592000` :
      `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songData.albummid}.jpg?max_age=2592000`,
  })
}

//处理歌手信息
export function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(item => {
    ret.push(item.name)
  })
  return ret.join('/')
}
//过滤不能播放的歌曲
export function isValidMusic (songData) {
  return songData.pay.pay_play === 0 || songData.pay.payplay === 0
}


