<template>
  <nav class="uni-footer-wrapper">
    <div class="box index" :class="{'active':$route.meta.active==='index'}">
      <div class="icon-img"></div>
      <p class="text">首页</p>
    </div>
    <div class="box durian" :class="{'active':$route.meta.active==='durian'}">
      <div class="icon-img"></div>
      <p class="text">榴莲圈</p>
    </div>
    <div class="box issue">
      <div class="icon-img"></div>
    </div>
    <div class="box shop" :class="{'active':$route.meta.active==='shop'}">
      <div class="icon-img"></div>
      <p class="text">商铺</p>
    </div>
    <div class="box my" :class="{'active':$route.meta.active==='my'}">
      <div class="icon-img"></div>
      <p class="text">我的</p>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'uni-footer'
  }
</script>

<style scoped lang="stylus">
  @import "../../stylus/variable.styl"
  .uni-footer-wrapper{
    position absolute
    bottom 0
    left 0
    height 100px
    width 100%
    display flex
    box-shadow 0 0 20px 0px #ddd
    .box{
      flex 1
      text-align center
      color #999
      font-size 0
      .icon-img{
        display inline-block
        margin-top 10px
        width 60px
        height 60px
        background-size cover
        background-position center center
      }
      .text{
        font-size 20px
      }
      &.active{
        color $common-color
      }
      &.index{
        .icon-img {
          background-image url("/static/image/menu/footer/home.png")
        }
        &.active{
          .icon-img {
            background-image url("/static/image/menu/footer/home-active.png")
          }
        }
      }
      &.durian{
        .icon-img {
          background-image url("/static/image/menu/footer/durian.png")
        }
        &.active{
          .icon-img {
            background-image url("/static/image/menu/footer/durian-active.png")
          }
        }
      }
      &.issue{
        .icon-img {
          width 80px
          height 80px
          background-image url("/static/image/menu/footer/issue.png")
        }
      }
      &.shop{
        .icon-img {
          background-image url("/static/image/menu/footer/shop.png")
        }
        &.active{
          .icon-img {
            background-image url("/static/image/menu/footer/shop-active.png")
          }
        }
      }
      &.my{
        .icon-img {
          background-image url("/static/image/menu/footer/my.png")
        }
        &.active{
          .icon-img {
            background-image url("/static/image/menu/footer/my-active.png")
          }
        }
      }
    }
  }
</style>
