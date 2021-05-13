import {playMode} from "common/js/config";
import {loadSearch, loadPlay, loadFavorite} from "common/js/cache";

const state = {
  singer: {},
  //播放器是否在播放
  playing: false,
  //播放器展开还是收起显示
  fullScreen: false,
  //播放列表
  playList: [],
  //顺序列表
  sequenceList: [],
  //播放模式
  mode: playMode.sequence,
  //播放的位置
  currentIndex: -1,
  //专辑
  disc: {},
  //排行
  topList: {},
  //搜索历史
  searchHistory: loadSearch(),
  //播放历史
  playHistory: loadPlay(),
  //喜欢列表
  favoriteList: loadFavorite()
}
export default state
