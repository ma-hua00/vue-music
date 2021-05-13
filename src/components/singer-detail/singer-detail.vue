<template>
  <transition name="slide">
    <music-list :title="title" :songs="songList"  :bgImage="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
//vuex提供的语法糖用来导入vuex中的getter
import {mapGetters} from 'vuex'
import {getSingerDetail} from "api/singer";
import {createSong, isValidMusic} from 'common/js/song'
import MusicList from "components/music-list/music-list"
import {getSongPlayUrl} from "api/song"

export default {
  name: "singer-detail",
  components: {MusicList},
  data() {
    return {
      songList: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    //vuex的语法糖  可以在组件中挂载vuex中的getter
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        this.songList = getSongPlayUrl(this._normalizeSingerDetail(res.singer.data.songlist))
      })
    },

    _normalizeSingerDetail(list) {
      let ret = []
      list.forEach(item => {
        isValidMusic(item) && ret.push(createSong(item))
      })
      return ret
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .singer-detail
    position fixed
    z-index 100
    top: 0
    bottom: 0
    left: 0
    right: 0
    background $color-background

  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)


</style>
