<template>
  <div id="app">
    <div class="login-tip-wrapper" v-if="loginShow">
      <div class="login-wrapper">
        <div class="title">温馨提示</div>
        <div class="sub">请点击确认登录后继续该操作</div>
        <div class="check">
          <span @click="check=!check" class="icon" :class="{'yes':check}"></span>
          <span class="text">同意</span>
          <span class="text xy">《英国由你用户协议》</span>
        </div>
        <div class="tail">
          <button @click="cancel" class="button cancel">取消</button>
          <button @click="confirm" class="button confirm">确定</button>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  var HTTP_HEADER
  var localUrl = window.location.href
  if (localUrl.indexOf('haiwaiuni') > 0) {
    HTTP_HEADER = 'www.haiwaiuni.com'
  } else if (localUrl.indexOf('beta-stable') > 0) {
    HTTP_HEADER = 'beta-stable.ukwelife.com'
  } else if (localUrl.indexOf('beta') > 0) {
    HTTP_HEADER = 'beta.ukwelife.com'
  } else if (localUrl.indexOf('test2') > 0) {
    HTTP_HEADER = 'test2.ukwelife.com'
  } else {
    HTTP_HEADER = 'test1.ukwelife.com'
  }
  export default {
    name: 'App',
    data() {
      return {
        loginShow: false,
        check: true
      }
    },
    methods: {
      cancel() {
        this.loginShow = false
        this.check = true
      },
      confirm() {
        this.loginShow = false
        window.location.href = '//' + HTTP_HEADER + '/v2/system/oauth?redirect=' + encodeURIComponent(window.location.href)
      }
    }
  }
</script>

<style lang="stylus">
  .login-tip-wrapper {
    position fixed
    top 0
    bottom @top
    left @top
    right @top
    background rgba(0, 0, 0, 0.5)
    z-index 9999
    .login-wrapper {
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 600px
      background-color #fff
      border-radius 16px
      text-align center
      overflow hidden
      .title {
        margin-top 60px
        line-height 50px
        font-size 36px
        color #333333
        font-weight bold
      }
      .sub {
        margin-top 20px
        line-height 20px
        font-size 28px
        color #666666
      }
      .check {
        margin-top 60px
        .icon {
          display inline-block
          width 24px
          height 24px
          margin-right 12px
          background-image url("/static/image/icon/icon-check-line.png")
          background-size cover
          background-position center
          vertical-align middle
          &.yes {
            background-image url("/static/image/icon/icon-check.png")
          }
        }
        .text {
          vertical-align middle
          font-size 24px
          color #666666
          &.xy {
            color #3BD6BB
          }
        }
      }
      .tail {
        margin-top 60px
        display flex
        border-top 2px solid #eeeeee
        .button {
          flex 1
          height 88px
          line-height 88px
          font-size 28px
          &.cancel {
            background-color #ffffff
            color #666666
          }
          &.confirm {
            background-color #3BD6BB
            color #ffffff
          }
        }
      }
    }
  }
</style>
