<template>
  <div class="city-outer-wrapper">
    <div class="city-header-wrapper">
      <div class="left" @click="back">
        <img src="/static/image/icon/icon-jiantou.png" class="icon">
        <span class="text">返回</span>
      </div>
      <div class="content">
        城市选择
      </div>
      <div class="left"></div>
    </div>
    <div class="city-content-wrapper">
      <div class="shaixuan-wrapper">
        <div class="title">
          定位城市
        </div>
        <div class="city-list">
          <div class="city" @click="chooseCityName(history[history.length-1])">
            {{history.length===0?'英国':history[history.length-1]}}
          </div>
        </div>
      </div>
      <div class="shaixuan-wrapper">
        <div class="title">
          最近选择
        </div>
        <div class="city-list">
          <div class="city" @click="chooseCityName(item)" v-for="(item,key) in history" :key="key">{{item}}</div>
        </div>
      </div>
      <div class="city-list-wrapper">
        <div v-for="(item,key) in city" :key="key" :id="key">
          <div class="title">{{key}}</div>
          <div class="city-list">
            <div class="city" @click="chooseCity(city)" v-for="(city,ck) in item" :key="ck">
              {{city.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="key-wrapper">
      <div class="empty"></div>
      <div class="key" v-for="(item,key) in city" :key="'key'+key">
        {{key}}
      </div>
      <div class="empty"></div>
    </div>
  </div>
</template>

<script>
  import {City} from '@/api/index.js'
  import {getCookie, setCookie} from '@/utils/common.js'

  export default {
    name: 'city',
    data() {
      return {
        history: [],
        city: []
      }
    },
    created() {
      this._initCity()
    },
    methods: {
      back() {
        this.$router.back()
      },
      chooseCity(city) {
        let id = city.id
        let name = city.name
        setCookie('city_id_food', id)
        setCookie('city_name_food', name)
        let obj = getCookie('cache_data')
        if (obj.length > 0) {
          var newstr = ''
          let arr = obj.split(',')
          if (obj.indexOf(name) < 0) {
            for (var i = 0; i < arr.length; i++) {
              newstr += arr[i] + ','
            }
            newstr += name
            let _name = encodeURI(name)
            setCookie(_name, id)
            setCookie('cache_data', newstr)
          }
        } else {
          let _name = encodeURI(name)
          setCookie(_name, id)
          setCookie('cache_data', name)
        }
        let _name = encodeURI(name)
        setCookie(_name, id)
        this.$emit('cityChange', {
          name: name,
          id: id
        })
        this.back()
      },
      chooseCityName(name) {
        let _name = encodeURI(name)
        let id = getCookie(_name)
        setCookie('city_id_food', id)
        setCookie('city_name_food', name)
        this.$emit('cityChange', {
          name: name,
          id: id
        })
        this.back()
      },
      _initCity() {
        let obj = getCookie('cache_data')
        if (obj.length > 0) {
          let arr = obj.split(',')
          this.history = arr
        } else {
          setCookie('cache_data', '英国')
          this.history = ['英国']
          let _name = encodeURI('英国')
          setCookie(_name, '0')
        }
        City().then((res) => {
          delete res.data[0]
          this.city = res.data
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../../../stylus/variable.styl"
  .city-outer-wrapper {
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color #ffffff
    z-index 99
    .city-header-wrapper {
      position absolute
      top 0
      left 0
      right 0
      padding 0 30px
      height 100px
      line-height 100px
      display flex
      box-sizing border-box
      box-shadow 0 0 20px 0px #e5e5e5
      z-index 1
      .left {
        flex 0 0 200px
        font-size 0
        .icon {
          height 50px
          vertical-align middle
          margin-right 10px
        }
        .text {
          font-size 28px
          color #333333
          font-weight bold
          vertical-align middle
        }
      }
      .content {
        flex 1
        font-size 36px
        color #333333
        font-weight bold
        text-align center
      }
    }
    .city-content-wrapper {
      position absolute
      top 100px
      left 0
      right 0
      bottom 0
      overflow scroll
      padding 0 80px 0 40px
      box-sizing border-box
      .shaixuan-wrapper {
        margin 30px 0 20px 0
        .title {
          font-size 32px
          font-weight bold
          color #666666
        }
        .city-list {
          display flex
          flex-wrap wrap
          .city {
            margin-top 30px
            margin-right 30px
            padding 0 30px
            height 60px
            line-height 60px
            font-size 26px
            color #666666
            border 2px solid #e5e5e5
            border-radius 60px
          }
        }
      }
      .city-list-wrapper {
        .title {
          height 80px
          line-height 80px
          font-size 24px
          color #cccccc
        }
        .city-list {
          .city {
            height 92px
            line-height 92px
            font-size 28px
            color #666666
            border-bottom 2px dashed #e5e5e5
          }
        }
      }
    }
    .key-wrapper {
      position fixed
      top 0
      bottom 0
      right 20px
      display flex
      flex-direction column
      .empty {
        flex 1
      }
      .key {
        width 40px
        height 40px
        line-height 40px
        text-align center
        color $common-color
        font-size 24px
      }
    }
  }
</style>
