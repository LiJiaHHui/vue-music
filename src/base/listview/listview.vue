<template>
  <scroll class="listview" :data="data" ref="listview">
    <ul>
      <!-- 循环中的group和item都是别名 -->
      <li v-for="(group, index) in data" class="list-group" :key="index" ref="listGroup">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <uL>
          <!-- item少写了s我去。。。。 -->
          <li
            v-for="(item, index) in group.items"
            :key="index"
            class="list-group-item"
            @click="selectItem(item)"
          >
            <img class="avatar" v-lazy="item.avatar" />
            <span class="name">{{ item.name }}</span>
          </li>
        </uL>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart">
      <ul>
          <!-- 扩展data-index属性，因为是个变量,所以要用v-bind -->
        <li v-for="(item, index) in shortcutList" :key="index" :data-index="index" class="item">
          {{ item }}
        </li>
      </ul>
    </div>
  </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
// 接收传入的数据
export default {
  props: {
    data: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  methods: {
      onShortcutTouchStart(e) {
          let anchorIndex = getData(e.target, 'index')
          this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 1, false, false)
      },
    //   将事件派发出去，告诉外部我被点击了及点击的元素是什么
      selectItem(item) {
          this.$emit('select', item)
      }
  },
  components: {
    Scroll
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
