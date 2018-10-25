<template>
  <div>
    <nav class="uni-footer-wrapper">
      <div class="box index" @click="goIndex" :class="{'active':$route.meta.active==='index'}">
        <div class="icon-img"></div>
        <p class="text">首页</p>
      </div>
      <div class="box durian" @click="goDurian" :class="{'active':$route.meta.active==='durian'}">
        <div class="icon-img"></div>
        <p class="text">榴莲圈</p>
      </div>
      <div class="box issue" @click="openIssue">
        <div class="icon-img"></div>
      </div>
      <div class="box shop" @click="goShop" :class="{'active':$route.meta.active==='shop'}">
        <div class="icon-img"></div>
        <p class="text">商铺</p>
      </div>
      <div class="box my" @click="goMine" :class="{'active':$route.meta.active==='my'}">
        <div class="icon-img"></div>
        <p class="text">我的</p>
      </div>
    </nav>
    <div class="issue-outer-wrapper" v-if="issueShow">
      <div class="type-wrapper">
        <div class="item-wrapper" @click="issuePost">
          <img src="/static/image/menu/issue-post.png" class="icon">
          <p class="text">帖子</p>
        </div>
        <div class="item-wrapper" @click="issueSecond">
          <img src="/static/image/menu/issue-second.png" class="icon">
          <p class="text">二手</p>
        </div>
        <div class="item-wrapper" @click="issueRent">
          <img src="/static/image/menu/issue-rent.png" class="icon">
          <p class="text">租房</p>
        </div>
      </div>
      <img @click.stop="issueShow=!issueShow" src="/static/image/icon/icon-close-common.png" class="close-button">
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui'

  export default {
    name: 'uni-footer',
    data() {
      return {
        issueShow: false
      }
    },
    methods: {
      issuePost() {
        window.location.href = window.setting.HTTPURL + 'addons/welife_durian/index.html??#/release'
      },
      issueSecond() {
        window.location.href = window.setting.HTTPURL + 'addons/welife_second/index.html??#/release'
      },
      issueRent() {
        window.location.href = window.setting.HTTPURL + 'addons/welife_rent/index.html??#/release'
      },
      goIndex() {
        this.$router.push('/index')
      },
      goDurian() {
        this.$router.push('/durian')
      },
      openIssue() {
        if (!window.user || window.user.token === '' || !window.user.token) {
          this.$root.$children[0].loginShow = true
          return false
        }
        if (window.user.status === '1') {
          MessageBox.alert('您已被禁言，暂时无法操作，请知悉', '')
          return false
        }
        this.issueShow = true
      },
      goShop() {
        this.$router.push('/shop')
      },
      goMine() {
        if (!window.user || window.user.token === '' || !window.user.token) {
          this.$root.$children[0].loginShow = true
          return false
        }
        window.location.href = window.setting.HTTPURL + 'addons/welife_mine/index.html#/'
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../stylus/variable.styl"
  .uni-footer-wrapper {
    position absolute
    bottom 0
    left 0
    height 100px
    width 100%
    display flex
    box-shadow 0 0 20px 0px #ddd
    .box {
      flex 1
      text-align center
      color #999
      font-size 0
      .icon-img {
        display inline-block
        margin-top 10px
        width 60px
        height 60px
        background-size cover
        background-position center center
      }
      .text {
        font-size 20px
      }
      &.active {
        color $common-color
      }
      &.index {
        .icon-img {
          background-image url("/static/image/menu/footer/home.png")
        }
        &.active {
          .icon-img {
            background-image url("/static/image/menu/footer/home-active.png")
          }
        }
      }
      &.durian {
        .icon-img {
          background-image url("/static/image/menu/footer/durian.png")
        }
        &.active {
          .icon-img {
            background-image url("/static/image/menu/footer/durian-active.png")
          }
        }
      }
      &.issue {
        .icon-img {
          width 80px
          height 80px
          background-image url("/static/image/menu/footer/issue.png")
        }
      }
      &.shop {
        .icon-img {
          background-image url("/static/image/menu/footer/shop.png")
        }
        &.active {
          .icon-img {
            background-image url("/static/image/menu/footer/shop-active.png")
          }
        }
      }
      &.my {
        .icon-img {
          background-image url("/static/image/menu/footer/my.png")
        }
        &.active {
          .icon-img {
            background-image url("/static/image/menu/footer/my-active.png")
          }
        }
      }
    }
  }

  .issue-outer-wrapper {
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-image url("/static/image/bg/issue.png")
    background-color #fff
    background-size cover
    background-position center center
    z-index 99
    .type-wrapper {
      position absolute
      left 0
      bottom 300px
      width 100%
      display flex
      padding 0 20px
      box-sizing border-box
      .item-wrapper {
        flex 1
        text-align center
        .icon {
          width 140px
          height 140px
        }
        .text {
          margin-top 14px
          font-size 28px
          color #333333
        }
      }
    }
    .close-button {
      position absolute
      bottom 12px
      width 66px
      height 66px
      left 50%
      margin-left -33px
    }
  }
</style>
