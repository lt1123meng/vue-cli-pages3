<template>
  <div class="loading-outer-wrapper">
    <img class="icon logo" :class="{'logo':!flag}" :src="src">
    <p class="text">加载中...</p>
  </div>
</template>

<script>

  export default {
    name: 'loading',
    props: {
      flag: {
        default: true
      }
    },
    computed: {
      src() {
        // if (this.flag) {
        //   return '/static/image/system/loading-center.gif'
        // } else {
          return '/static/image/system/logo-zheng.png'
        // }
      }
    }
    // data() {
    //   return {
    //     src: '/static/image/system/loading-center.gif',
    //     flag: false
    //   }
    // },
    // created() {
    //   console.log('created')
    //   this.src = '/static/image/system/loading-center.gif'
    //   this.flag = false
    // },
    // activated() {
    //   console.log('activated')
    //   this.src = '/static/image/system/loading-center.gif'
    //   this.flag = false
    // },
    // deactivated() {
    //   console.log('deactivated')
    //   this.src = '/static/image/system/logo-zheng.png'
    //   this.flag = true
    // },
    // destroyed() {
    //   console.log('destroyed')
    //   this.src = '/static/image/system/logo-zheng.png'
    //   this.flag = true
    // }
  }
</script>

<style scoped lang="stylus">
  .loading-outer-wrapper {
    text-align center
    .icon {
      margin-top 220px
      width 240px
      &.logo {
        border-radius 50%
        margin-top 280px
        width 100px
      }
    }
    .text{
      color #666
      font-size 28px
      margin-top 20px
    }
  }
</style>
