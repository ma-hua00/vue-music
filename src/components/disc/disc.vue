<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songList"></music-list>
  </transition>
</template>

<script>
import MusicList from "../music-list/music-list";

import {mapGetters} from "vuex"
import {getDiscDetail} from "api/disc"
import {getSongPlayUrl} from "api/song"
import {createSong, isValidMusic} from 'common/js/song'

export default {
  name: "disc",
  components: {MusicList},
  data() {
    return {
      songList: []
    }
  },
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getDiscDetail(this.disc.dissid).then(res => {
        this.songList = getSongPlayUrl(this._normalizeSongList(res.cdlist[0].songlist))
      })
    },

    _normalizeSongList(list) {
      let ret = []
      list.forEach(item => {
        if (item.id && item.mid) {
          isValidMusic(item) && ret.push(createSong(item))
        }
      })
      return ret
    }
  },

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
