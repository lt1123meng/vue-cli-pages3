<template>
  <div class="index-packet-wrapper">
    <img @click="packet" src="/static/image/system/index-packet.gif" class="packet" :class="{'hide':hide}">
    <div class="mast" v-if="mast">
      <div class="image-wrapper">
        <img src="/static/image/system/packet-success.png" v-if="lingqu===0" class="image">
        <img src="/static/image/system/packet-has.png" v-else class="image">
        <img src="/static/image/system/packet-close.png" @click="hideMast" class="close">
        <img src="/static/image/system/packet-confirm.png" @click="hideMast" class="confirm">
      </div>
    </div>
  </div>
</template>

<script>
  import {IsIndexPacket, PacketAdd} from '@/api/packet.js'

  export default {
    name: 'packet',
    props: {
      scroll: {
        default: 0
      }
    },
    data() {
      return {
        hide: false,
        mast: false,
        lingqu: 0
      }
    },
    created() {
      this.time = ''
    },
    methods: {
      packet() {
        if (!window.user || window.user.token === '' || !window.user.token) {
          this.$root.$children[0].loginShow = true
          return false
        }
        this._initLingqu()
      },
      hideMast() {
        this.mast = false
      },
      _initLingqu() {
        IsIndexPacket().then(
          (res) => {
            console.log(res)
            this.lingqu = res.data.is_gold
            if (this.lingqu === 0) {
              PacketAdd().then(() => {
                this.mast = true
              })
            } else {
              this.mast = true
            }
          }
        )
      }
    },
    watch: {
      scroll() {
        this.hide = true
        clearTimeout(this.time)
        this.time = setTimeout(() => {
          this.hide = false
        }, 3000)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .index-packet-wrapper {
    .packet {
      position fixed
      bottom 180px
      right 20px
      width 160px
      transition right .3s ease-in-out
      z-index 99
      &.hide {
        right -80px
      }
    }
    .mast {
      position fixed
      top 0
      bottom 0px
      right 0px
      left 0
      font-size 0
      background-color rgba(0, 0, 0, 0.3)
      z-index 9999
      .image-wrapper {
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
        .image {
          width 100%
          vertical-align top
        }
        .close {
          position absolute
          top 350px
          right 110px
        }
        .confirm {
          position absolute
          top 855px
          left 50%
          width 274px
          margin-left -137px
        }
      }
    }
  }

</style>
