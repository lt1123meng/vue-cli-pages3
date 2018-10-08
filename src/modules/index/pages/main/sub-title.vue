<template>
  <div class="sub-title-wrapper">
    <h1><span>{{title}}</span><span class="line"></span></h1>
    <p>{{sub}}</p>
  </div>
</template>

<script>
  export default {
    name: 'sub-title',
    props: {
      title: {
        type: String,
        default: ''
      },
      sub: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="stylus">
  .sub-title-wrapper {
    text-align center
    line-height 26px
    h1 {
      position relative
      font-size 22px
      .line {
        position absolute
        top -10px
        left 50%
        width 30px
        height 3px
        margin-left -15px
        background-color #42b983
      }
    }
  }
</style>
