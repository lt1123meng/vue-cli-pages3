<template>
  <div class="loading-outer-wrapper">
    <img class="icon" src="/static/image/system/loading-center.gif">
  </div>
</template>

<script>
  export default {
    name: 'loading'
  }
</script>

<style scoped lang="stylus">
  .loading-outer-wrapper {
    text-align center
    .icon {
      margin-top 220px
      width 240px
    }
  }
</style>
