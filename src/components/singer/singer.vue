<template>
    <div class="singer" ref="singer">
        <list-view :data="singers" @select="selectSinger"></list-view>
        <!-- 挂载路由 -->
        <router-view></router-view>
    </div>
</template>
<script type="text/ecmascript-6">
// import {getSingerList} from 'api/singer'
// import {ERR_OK} from 'api/config'
// import Singer from 'common/js/singer'
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'
  import {mapMutations} from 'vuex'
const HOT_NAME = '最热'
const HOT_SINGER_LEN = 10
export default {
    data() {
        return {
            singers: []
        }
    },
    created() {
        this._getSingerList()
    },
    methods: {
        _getSingerList() {
            getSingerList().then((res) => {
                if (res.code === ERR_OK) {
                    this.singers = this._normalizeSinger(res.data.list)
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
            list.forEach((item, index) => {
                if (index < HOT_SINGER_LEN) {
                    map.hot.items.push(new Singer({
                       name: item.Fsinger_name,
                       id: item.Fsinger_mid
                    }))
                }
                const key = item.Findex
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                map[key].items.push(new Singer({
                    name: item.Fsinger_name,
                    id: item.Fsinger_mid
                }))
            })
            // 有序排列
            let hot = []
            let ret = []
            // 通过map的key拿到val，对val进行判断，字母类放到ret中，热门类放到hot中
            for (let key in map) {
                let val = map[key]
                if (val.title.match(/[a-zA-Z]/)) {
                    ret.push(val)
                } else if (val.title === HOT_NAME) {
                    hot.push(val)
                }
            }
            // 对ret进行排序
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
        },
        selectSinger(singer) {
            this.$router.push({
                path: `/singer/${singer.id}`
            })
            this.setSinger(singer)
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        })
    },
    components: {
        ListView
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer
        position: fixed
        top: 88px
        bottom :0
        width :100%
</style>
