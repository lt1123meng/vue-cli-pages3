<template>
  <div class="shop-item-wrapper">
    <div class="shop-item-box" :class="{'click':click}" @click="goShopDetail">
      <div class="avatar-wrapper">
        <div class="avatar" :style="'background-image: url('+_getImg(data.logo)+')'"></div>
        <img class="tag" v-if="data.is_licence" src="/static/image/icon/user-v.png">
      </div>
      <div class="info-wrapper">
        <div class="name-money">
          <div class="name">
            {{data.name}}
          </div>
          <div class="money">
            人均消费£{{data.pita_price}}
          </div>
        </div>
        <div class="info-tel">
          <div class="info">
            <p class="text">人气：{{data.num_view}}</p>
            <p class="text">地址：{{data.address}}</p>
          </div>
          <div class="tel">
            <img @click.stop="tel" src="/static/image/icon/icon-phone.png" class="icon">
          </div>
        </div>
        <div class="tag-wrapper">
          <div class="tag">{{data.type_name}}</div>
          <div class="tag">{{data.city_name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shop-item',
    props: {
      data: {
        default: {}
      }
    },
    data() {
      return {
        post: '',
        click: false
      }
    },
    mounted() {

    },
    methods: {
      tel() {
        window.location.href = 'tel:' + this.data.tel
      },
      goShopDetail() {
        this.$emit('detail')
        this.click = true
        setTimeout(() => {
          this.click = false
          window.location.href = window.setting.HTTPURL + 'addons/welife_food/index.html#/shopingdetail/' + this.data.id
        }, 250)
      },
      _getImg(url) {
        return window.setting.CDNImage + url
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../stylus/variable.styl"
  .shop-item-wrapper {
    background-color #fff
    .shop-item-box {
      padding 30px
      display flex
      &.click {
        background-color #f3f3f3
        box-shadow 0 0 80px 10px #fff inset
      }
      .avatar-wrapper {
        position relative
        flex 0 0 120px
        .avatar {
          width 120px
          height 120px
          border-radius 50%
          background-size cover
          background-position center
        }
        .tag {
          position absolute
          top 76px
          right -6px
          width 50px
          height 50px
        }
      }
      .info-wrapper {
        flex 1
        padding-left 24px
        .name-money {
          display flex
          height 44px
          line-height 44px
          .name {
            flex 1
            font-size 32px
            color #333333
            font-weight bold
          }
          .money {
            font-size 24px
            color #999999
          }
        }
        .info-tel {
          display flex
          margin-top 6px
          .info {
            flex 1
            .text {
              font-size 24px
              color #999999
              ell2(1)
            }
          }
          .tel {
            position relative
            top 20px
            flex 0 0 80px
            text-align right
            margin-top 16px
            height 34px
            border-left 2px solid #eeeeee
            .icon {
              margin-top -16px
              width 60px
              height 60px
            }
          }
        }
        .tag-wrapper {
          margin-top 14px
          .tag {
            display inline-block
            color #F5A623
            font-size 24px
            height 42px
            line-height 42px
            border 2px solid #F5A623
            padding 0 20px
            border-radius 42px
            margin-right 20px
          }
        }
      }
      .topic-wrapper {
        text-align right
        font-size 0
        height 70px
        line-height 70px
        .icon {
          vertical-align middle
          width 40px
          height 40px
          margin-right 4px
        }
        .text {
          font-size 24px
          vertical-align middle
          color $common-color
        }
      }
    }
  }
</style>
