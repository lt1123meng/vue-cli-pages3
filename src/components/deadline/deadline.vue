<template>
  <div class="deadline">
    <div class="text">我是有底线的</div>
  </div>
</template>

<script>
  export default {
    name: 'deadline'
  }
</script>

<style scoped lang="stylus">
  .deadline {
    position relative
    margin 90px auto
    width 100%
    text-align center
    border-top 2px solid #cccccc
    .text {
      position relative
      display inline-block
      font-size 32px
      color #999
      padding 0 20px
      top -26px
      background-color #fff
    }
  }
</style>
