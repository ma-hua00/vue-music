<template>
  <scroll
    class="suggest"
    :data="result"
    :pullup="pullup"
    :beforeScroll="beforeScroll"
    @beforeScroll="listenScroll"
    @scrollToEnd="searchMore"
    ref="suggest"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <div class="loading-container" v-show="hasMore" title="">
        <loading></loading>
      </div>
    </ul>
    <div class="no-result-wrapper">
      <no-result v-show="!hasMore && !result.length" title="抱歉,无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>

import {search} from "api/search"
import {getSongPlayUrl} from "api/song"

import {mapActions} from "vuex"

import {createSong, isValidMusic} from "common/js/song";

import Scroll from "base/scroll/scroll";
import Loading from "base/loading/loading";
import NoResult from "base/no-result/no-result";

const limit = 30

export default {
  name: "suggest",
  components: {NoResult, Loading, Scroll},
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      beforeScroll: true,
      hasMore: true
    }
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh()
    },
    listenScroll() {
      this.$emit('listenScroll')
    },
    //点击查询到的歌曲并添加到播放列表
    selectItem(item) {
      this.insertSong(item)
      this.$emit('search')
    },
    //请求查询数据
    search() {
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0,0)
      if (!this.query) {
        return
      }
      search(this.query, this.page, limit).then(res => {
        this.result = getSongPlayUrl(this._normalizeSongs(res.data.song.list))
        this._checkMore(res.data)
      })
    },
    //scroll组件监听到下拉加载后传出的事件
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, limit).then(res => {
        this.result.push(...getSongPlayUrl(this._normalizeSongs(res.data.song.list)))
        this._checkMore(res.data)
      })
    },
    //检测请求的数据是否已加载完
    _checkMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * limit) > song.totalnum) {
        this.hasMore = false
      }
    },
    getDisplayName(item) {
      return `${item.name}-${item.singer}`
    },
    //预处理歌曲数据
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        if (item.id && item.mid) {
          isValidMusic(item) && ret.push(createSong(item))
        }
      })
      return ret
    },
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query() {
      this.search()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
