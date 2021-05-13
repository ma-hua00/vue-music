<template>
  <div class="singer" ref="singer">
    <listview @select="selectSinger" :data="singerList" ref="list"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
import {getSingerList} from "api/singer";
import {ERR_OK} from "api/config";
import Singer from "common/js/singer";
import Listview from "base/listview/listview";
import {playlistMixin} from "common/js/mixin";

//语法糖导入vuex里的mutation
import {mapMutations} from "vuex"

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  mixins: [playlistMixin],
  name: "singer",
  components: {Listview},
  data() {
    return {
      singerList: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    handlePlaylist(playList) {
      const bottom = playList.length > 0 ? '60px' : 0
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code == ERR_OK) {
          this.singerList = this ._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item,index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
          // console.log(item.Fsinger_mid)
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
      })
      //为了得到有序列表，我们需要处理map
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        //match()方法检索返回一个字符串匹配正则表达式的结果
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        }else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      //sort() 方法用原地算法对数组的元素进行排序，并返回数组。 用前一个数据前去后一个数据就可以进行升序排列
      ret.sort((a, b) => {
        //charCodeAt(index) 方法用来判断字符串第index索引值的 ASCII码
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    //vuex提供的语法糖方法 可以组件内挂载vuex中的mutation
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%

</style>
