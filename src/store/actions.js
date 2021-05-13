import * as types from './mutation-types'
import {playMode} from "common/js/config";
import {shuffle} from "common/js/util";
import {saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite} from "common/js/cache";

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}


//选中歌手的一首歌曲 播放该歌曲并将歌手的歌曲添加到列表
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    index = findIndex(randomList, list[index])
    commit(types.SET_PLAYLIST, randomList)
  }else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

//随机播放全部
export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ({commit, state}, song) {
  //不能通过actions直接改变state里的值 可以通过slice来对state里的内容进行副本 而currentIndex是值可以直接赋给定义好的变量
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  //获取当前播放歌曲
  let currentSong = playList[currentIndex]
  //查找playList是否存在需要插入的歌曲并返回索引
  let fpIndex = findIndex(playList, song)
  //因为是在当前播放的歌曲后面插入所以currentIndex++
  currentIndex++
  //往playList里插入歌曲
  playList.splice(currentIndex, 0, song)
  //判断是否再插入前已经存在该歌曲
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    }else {
      playList.splice(fpIndex + 1, 1)
    }
  }
  //获取当前播放歌曲在sequenceList的索引值
  let currentSIndex = findIndex(sequenceList, currentSong)
  //查找sequenceList是否存在需要插入的歌曲并返回索引
  let fsIndex = findIndex(sequenceList, song)
  //因为是在当前播放的歌曲后面插入所以currentSIndex++
  currentSIndex++
  //往sequenceList里插入歌曲
  sequenceList.splice(currentSIndex, 0, song)
  //判断是否再插入前已经存在该歌曲
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    }else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)

}

//保存搜索记录
export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

//删除搜索记录
export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

//清除所有搜索记录
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

//保存最近播放歌曲
export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

//保存收藏歌曲
export const saveFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

//删除收藏歌曲
export const deleteFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}

//删除歌曲
export const deleteSong = function ({commit, state}, song) {
  //不能通过actions直接改变state里的值 可以通过slice来对state里的内容进行副本 而currentIndex是值可以直接赋给定义好的变量
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playList, song)
  playList.splice(pIndex, 1)
  let SIndex = findIndex(sequenceList, song)
  sequenceList.splice(SIndex, 1)
  if (pIndex < currentIndex || currentIndex === playList.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  const playingState = playList.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
  commit(types.SET_PLAYING_STATE, playingState)
}

//清空歌曲列表
export const clearSongList = function ({commit}) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}
