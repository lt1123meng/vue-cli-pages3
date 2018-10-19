<template>
  <div class="index-outer-wrapper">
    <div class="index-content-wrapper">
      <swiper class="banner-wrapper" :options="indexBannerOption">
        <swiper-slide
          class="banner-slide"
          v-for="(item,key) in indexBannerImg"
          :key="key"
          :style="'background-image: url('+_getImgUrl(item.img_banner)+')'"
        >
        </swiper-slide>
      </swiper>
    </div>
    <uni-footer></uni-footer>
  </div>
</template>

<script>
  import {IndexBanner} from '@/api/index.js'
  import UniFooter from '@/components/uni-footer/uni-footer'

  export default {
    name: 'index',
    data() {
      return {
        indexBannerImg: [],
        indexBannerOption: {
          loop: true,
          // autoplay: {
          //   delay: 4000
          // }
        }
      }
    },
    created() {
      this._initBanner()
    },
    methods: {
      _initBanner() {
        IndexBanner().then((res) => {
          this.indexBannerImg = res.data.center
        })
      },
      _getImgUrl(url) {
        return window.setting.CDNImage + url
      }
    },
    components: {
      UniFooter
    }
  }
</script>

<style scoped lang="stylus">
  .index-outer-wrapper {
    position absolute
    top 0
    bottom 0px
    left 0
    width 100%
    .index-content-wrapper {
      position absolute
      top 0
      bottom 100px
      left 0
      width 100%
      .banner-wrapper {
        height 228px
        .banner-slide {
          background-size cover
          background-position center center
        }
      }
    }
  }
</style>
