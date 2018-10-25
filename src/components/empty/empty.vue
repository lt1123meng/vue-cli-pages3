<template>
  <div class="empty-outer-wrapper">
    <img class="icon" src="/static/image/system/empty.png">
    <p class="text">暂无数据</p>
  </div>
</template>

<script>

  export default {
    name: 'empty'
  }
</script>

<style scoped lang="stylus">
  .empty-outer-wrapper {
    text-align center
    .icon {
      margin-top 220px
      width 600px
    }
    .text{
      margin-top 32px
      font-size 26px
      color #666666
    }
  }
</style>
