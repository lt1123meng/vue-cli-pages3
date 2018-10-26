<template>
  <div class="durian-item-wrapper" @click="goDurianDetail">
    <div class="durian-item-box" :class="{'click':click}">
      <div class="durian-item-head-wrapper">
        <div class="avatar-wrapper">
          <img class="avatar" :src="data.avatar" alt="">
          <img class="tag" v-if="data.has_auth=='0'" src="/static/image/icon/user-vv.png">
          <img class="tag" v-if="data.has_auth=='1'" src="/static/image/icon/user-vv.png">
        </div>
        <div class="info-wrapper">
          <p class="name">{{data.nickname}}</p>
          <p class="auth">{{data.auth_info}}</p>
        </div>
        <div class="topic-wrapper" v-if="data.title" @click.stop="goTopicDetail">
          <img src="/static/image/icon/icon-topic.png" class="icon">
          <span class="text">{{data.title}}</span>
        </div>
      </div>
      <div class="durian-item-content-wrapper" v-if="post">
        <div class="wrapper">
          <div class="content-title-wrapper">
            <div class="title" :class="{'price':!(post.img.length!==0&&post.img.length<4)}">
              <img class="hot" v-if="data.xuanshang===1" src="/static/image/icon/icon-xs.png">
              <span class="xs" v-if="data.xuanshang===1">悬赏</span>
              <img class="hot" v-if="data.is_essence+''==='1'" src="/static/image/icon/icon_essence.png">
              <img class="hot" v-if="data.have_fire===1" src="/static/image/icon/icon-hot.png">
              <span v-if="data.son&&data.son.city_name" class="city text">{{data.son.city_name}} | </span>
              <span class="text">{{data.post_title}}</span>
              <div class="money-wrapper">
              <span class="price">
                {{post.price}}
              </span>
                <span class="yuan">
                {{post.market}}
              </span>
              </div>
            </div>
            <div class="content">{{post.text}}</div>
            <div
              class="money-wrapper"
              v-if="post.img.length!==0&&post.img.length<4">
              <span class="price">
                {{post.price}}
              </span>
              <span class="yuan">
                {{post.market}}
              </span>
            </div>
          </div>
          <div
            class="img-wrapper"
            v-if="post.img.length!==0&&post.img.length<4"
            :style="'background-image: url('+post.img[0]+')'"
            @click.stop="preview(post.img[0])"
          >
          </div>
        </div>
        <div class="img-list" v-if="post.img.length>=4">
          <div
            class="img-box"
            v-for="(item,key) in post.img"
            :key="key"
            v-if="key<4"
          >
            <div class="img" @click.stop="preview(item)" :style="'background-image: url('+item+')'">
            </div>
            <div class="more" @click.stop="preview(item)" v-if="post.img.length>4&&key==3">
              <span class="text">+{{post.img.length-3}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="durian-item-tail-wrapper">
        <div class="time">{{data.create_at}}</div>
        <div class="bun">{{data.num_view}}人浏览</div>
      </div>
    </div>
    <div class="line"></div>
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
      let text = ''
      let img = []
      let price = ''
      let market = ''
      let content = this.data.content
      for (let i = 0; i < content.length; i++) {
        if (content[i].type + '' === '0') {
          img.push(this._getImg(content[i].img))
        } else {
          if (!text) {
            text = content[i].text
          }
        }
      }
      this.data.xuanshang = 0
      if (this.data.title === '问答' || this.data.title === '帮帮') {
        if (this.data.final_price && parseFloat(this.data.final_price) > 0 && this.data.best_comment_id === '0') {
          this.data.xuanshang = 1
        }
      }
      if (this.data.son) {
        this.data.son.price = parseFloat(this.data.son.price)
        if (this.data.son.price < 0) {
          price = '面议'
        } else if (this.data.son.tenancy) {
          if (this.data.title === '二手出售') {
            if (this.data.son.price_market) {
              market = '£' + changePrice(parseFloat(this.data.son.price_market))
            } else {
              market = ''
            }
          }
          price = '£' + changePrice(this.data.son.price) + '/' + this.data.son.tenancy
        } else {
          if (this.data.title === '二手出售') {
            if (this.data.son.price_market) {
              market = '£' + changePrice(parseFloat(this.data.son.price_market))
            } else {
              market = ''
            }
          }
          price = '£' + changePrice(this.data.son.price)
        }
        if (this.data.son.img_list) {
          let imgList = this.data.son.img_list.split(',')
          for (let k = 0; k < imgList.length; k++) {
            img.push(this._getImg(imgList[k]))
          }
        }
      }
      this.post = {
        text: text,
        img: img,
        price: price,
        market: market
      }
    },
    methods: {
      goDurianDetail() {
        this.$emit('detail')
        this.click = true
        setTimeout(() => {
          this.click = false
          window.location.href = window.setting.HTTPURL + 'addons/welife_durian/index.html#/detail/' + this.data.id
        }, 250)
      },
      goTopicDetail() {
        window.location.href = window.setting.HTTPURL + 'addons/welife_durian/index.html#/topic/' + this.data.topic_id
      },
      preview(url) {
        window.wx.previewImage({
          current: url,
          urls: this.post.img
        })
      },
      _getImg(url) {
        if (this.data.is_large + '' === '0') {
          return window.setting.CDNImage + url
        } else {
          return url
        }
      }
    }
  }

  function changePrice(num) {
    num = parseFloat(num)
    if (num >= 0 && num <= 999) {
      return num
    }
    if (num >= 1000 && num < 999999) {
      num = parseInt(num / 1000)
      return num + 'K+'
    }
    if (num >= 999999) {
      return '999K+'
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../stylus/variable.styl"
  .durian-item-wrapper {
    background-color #fff
    .line {
      margin 0 auto
      width 690px
      border-bottom 2px dashed #eeeeee
    }
    .durian-item-box {
      padding 30px
      &.click {
        background-color #f3f3f3
        box-shadow 0 0 80px 10px #fff inset
      }
      .durian-item-head-wrapper {
        display flex
        .avatar-wrapper {
          position relative
          flex 0 0 70px
          .avatar {
            width 70px
            height 70px
            border-radius 50%
          }
          .tag {
            position absolute
            bottom 0
            right 0
            width 32px
            height 32px
          }
        }
        .info-wrapper {
          flex 1
          padding-left 20px
          .name {
            font-size 28px
            color #666666
          }
          .auth {
            font-size 24px
            color $orange-color
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
      .durian-item-content-wrapper {
        .wrapper {
          display flex
          .money-wrapper {
            .price {
              display inline-block
              color $red-color
              font-size 36px
              margin-right 20px
            }
            .yuan {
              color $sub-color
              font-size 28px
              text-decoration line-through
            }
          }
          .content-title-wrapper {
            flex 1
            overflow hidden
            padding-right 20px
            .title {
              position relative
              color #151515
              ell2(1)
              font-size 0
              height 44px
              line-height 44px
              .money-wrapper {
                display none
              }
              &.price {
                padding-right 150px
                .money-wrapper {
                  display block
                  position absolute
                  right 0
                  top 0
                }
              }
              .text {
                font-size 32px
                vertical-align middle
                font-weight bold
              }
              .hot {
                vertical-align middle
                height 40px
                margin-right 6px
              }
              .xs {
                position relative
                left -6px
                color $red-color
                font-size 28px
                vertical-align middle
              }
              .city {
                color #666
              }
            }
            .content {
              margin-top 12px
              font-size 24px
              color #999999
              line-height 34px
              ell2(2)
            }
          }
          .img-wrapper {
            flex 0 0 140px
            height 140px
            border-radius 10px
            background-size cover
            background-position center center
          }
        }
        .img-list {
          display flex
          margin 10px -10px
          .img-box {
            position relative
            flex 0 0 25%
            padding-top 25%
            .img {
              position absolute
              top 10px
              left 10px
              right 10px
              bottom 10px
              background-size cover
              background-position center center
              border-radius 12px
            }
            .more {
              position absolute
              top 10px
              left 10px
              right 10px
              bottom 10px
              line-height: 100%;
              background rgba(51, 51, 51, 0.40)
              border-radius 12px
              font-size 50px
              color #fff
              .text {
                position absolute
                top 50%
                left 50%
                transform translate(-50%, -50%)
              }
            }
          }
        }
      }
      .durian-item-tail-wrapper {
        display flex
        margin-top 20px
        font-size 20px
        color #999999
        .time, .num {
          flex 1
        }
        .num {
          text-align right
        }
      }
    }
  }
</style>
