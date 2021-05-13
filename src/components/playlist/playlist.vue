<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" @click="changeMode" :class="iconMode"></i>
            <span class="text">{{playModeText}}</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <scroll :refreshDelay="refreshDelay" ref="listContent" class="list-content" :data="sequenceList">
          <transition-group name="list" tag="ul">
            <li
              :key="item.id"
              ref="listItem"
              @click="changePlaySong(item)"
              class="item"
              v-for="item in sequenceList"
            >
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like" @click.stop="toggleFavorite(item)">
                <i :class="getFavoriteIcon(item)"></i>
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add" @click="addSong">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm
        text="您确定要删除播放列表里的所有歌曲吗?"
        confirmBtnText="删除"
        @confirm="confirmClear"
        ref="confirm"
      >
      </confirm>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>

<script>

import {mapMutations, mapActions} from "vuex"

import {playMode} from "common/js/config";
import {playerMixin, favoriteMixin} from "common/js/mixin";

import Scroll from "base/scroll/scroll";
import Confirm from "base/confirm/confirm";
import AddSong from "../add-song/add-song";

export default {
  mixins: [playerMixin, favoriteMixin],
  name: "playlist",
  components: {AddSong, Confirm, Scroll},
  data() {
    return {
      showFlag: false,
      refreshDelay: 100
    }
  },
  computed: {
    playModeText() {
      return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.loop ?
        '循环播放' : '随机播放'
    }
  },
  methods: {
    //添加歌曲
    addSong() {
      this.$refs.addSong.show()
    },
    //删除歌曲
    deleteOne(item) {
      this.deleteSong(item)
      if (!this.playList.length) {
        this.hide()
      }
    },
    //显示是否删除全部询问弹窗
    showConfirm() {
      this.$refs.confirm.show()
    },
    //清空歌曲播放列表
    confirmClear() {
      this.clearSongList()
      this.hide()
    },
    //切换歌曲
    changePlaySong(song) {
      let index = this.playList.findIndex(item => {
        return item.id === song.id
      })
      if (index > -1) {
        this.setCurrentIndex(index)
      }
      this.setPlayingState(true)
    },
    show() {
      this.showFlag = true
      //因为改变了显示 所以要重新刷新Bscroll 设置20ms延迟
      setTimeout(() => {
        this.$refs.listContent.refresh()
        this.scrollToCurrent(this.currentSong)
      }, 20)
    },
    hide() {
      this.showFlag = false
    },
    getCurrentIcon(item) {
      return this.currentSong.id === item.id ? 'icon-play' : ''
    },
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex(item => {
        return item.id === current.id
      })
      this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
    },
    ...mapMutations({
      setSequenceList: 'SET_SEQUENCE_LIST',
    }),
    ...mapActions([
      'deleteSong',
      'clearSongList'
    ])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return
      }
      this.scrollToCurrent(newSong)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>
