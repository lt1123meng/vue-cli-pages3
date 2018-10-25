<template>
  <div class="loading-outer-wrapper">
    <img class="icon" :class="{'logo':!flag}" :src="src">
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
        if (this.flag) {
          return '/static/image/system/loading-center.gif'
        } else {
          return '/static/image/system/logo-zheng.png'
        }
      }
    }
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
  }
</style>
