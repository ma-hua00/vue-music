<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songList" :is-top="true"></music-list>
  </transition>
</template>

<script>
import MusicList from "../music-list/music-list";

import {mapGetters} from "vuex"

import {getMusicList} from "api/rank"
import {ERR_OK} from "api/config";
import {createSong, isValidMusic} from 'common/js/song'
import {getSongPlayUrl} from "api/song";

export default {
  name: "top-list",
  components: {MusicList},
  data() {
    return {
      songList: []
    }
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      return this.songList.length > 0 ? this.songList[0].image : this.topList.picUrl
    },
    ...mapGetters([
      'topList'
    ])
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then(res => {
        if (res.code === ERR_OK) {
          this.songList = getSongPlayUrl(this._normalizeSongList(res.songlist))
        }
      })
    },
    _normalizeSongList(list) {
      let ret = []
      list.forEach(item => {
        const musicData = item.data
        isValidMusic(musicData) && ret.push(createSong(musicData))
      })
      return ret
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
