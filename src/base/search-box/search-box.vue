<template>
  <div class="search-box" @click="selectBox">
    <i class="icon-search"></i>
    <input ref="searchInput" class="box" v-model="query" :placeholder="placeholder">
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script>

import {debounce} from "common/js/util";

export default {
  name: "search-box",
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    blur() {
      this.$refs.searchInput.blur()
    },
    clear() {
      this.query = ''
    },
    setQuery(newQuery) {
      this.query = newQuery
    },
    //点击搜索盒子就能获得搜索框的焦点
    selectBox() {
      this.$refs.searchInput.focus()
    }
  },
  created() {
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query' , newQuery)
      this.$refs.searchInput.focus()
    }, 200))
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      outline: 0
      &::placeholder
        color: $color-text-d
    .box:focus {
      border 1px solid $color-theme
    }
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
