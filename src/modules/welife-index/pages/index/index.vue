<template>
  <div class="index-outer-wrapper">
    <div class="index-content-wrapper">
      <swiper v-if="indexBannerImg.length>0" class="banner-wrapper" ref="bannerSwiper" :options="indexBannerOption">
        <swiper-slide
          class="banner-slide"
          v-for="(item,key) in indexBannerImg"
          :key="key"
          :style="'background-image: url('+_getImgUrl(item.img_banner,'0')+')'"
        >
        </swiper-slide>
      </swiper>
      <div class="notice-wrapper">
        <div class="icon-wrapper">
          <img class="icon" src="/static/image/icon/icon-laba.png">
        </div>
        <swiper v-if="indexNotice.length>0" class="list-wrapper" ref="noticeSwiper" :options="indexNoticeOption">
          <swiper-slide
            class="item"
            v-for="(item,key) in indexNotice"
            :key="key"
          >
            <div class="left">{{item.text}}</div>
            <div class="right">
              <span class="text">{{item.data_type}}</span>
              <img class="icon" src="/static/image/icon/icon-circle-next.png">
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <nav class="menu-wrapper" :class="{'spread':menuFold===false}">
        <div class="wrapper">
          <div class="item-box">
            <img class="icon" src="/static/image/menu/tourism.png">
            <p class="text">旅游</p>
          </div>
          <div class="item-box">
            <img class="icon" src="/static/image/menu/shop.png">
            <p class="text">拼团购</p>
          </div>
          <div class="item-box">
            <img class="icon" src="/static/image/menu/second.png">
            <p class="text">二手</p>
          </div>
          <div class="item-box">
            <img class="icon" src="/static/image/menu/rent-home.png">
            <p class="text">租房</p>
          </div>
          <div class="item-box">
            <img class="icon" src="/static/image/menu/logistics.png">
            <p class="text">物流</p>
          </div>
          <div class="item-box">
            <img class="icon" src="/static/image/menu/rent-car.png">
            <p class="text">专车</p>
          </div>
          <div class="item-box">
            <img class="icon" src="/static/image/menu/uni.png">
            <p class="text">最IN海外</p>
          </div>
        </div>
        <div class="tail-box" @click="menuFoldClick">
          <span class="text" v-if="!menuFold">收起更多</span>
          <span class="text" v-else>查看更多</span>
          <img class="icon" src="/static/image/icon/icon-solid-triangle.png">
        </div>
      </nav>
      <div class="hot-wrapper">
        <div class="title-wrapper">
          <div class="left">热门精选</div>
          <div class="right">查看更多 ></div>
        </div>
        <div class="content-wrapper">
          <div
            class="item-wrapper"
            v-for="(item,key) in indexHot.list"
            :key="key"
          >
            <div
              class="post-img"
              :style="'background-image: url('+_getImgUrl(item.cover_img,'0')+')'"
            ></div>
            <p class="title">
              [{{item.country}}]{{item.title}}
            </p>
            <p class="sub">
              {{item.num_view}}人想去
            </p>
          </div>
        </div>
      </div>
      <div class="durian-wrapper">
        <div class="title-wrapper">
          <div class="left">榴莲圈</div>
          <div class="right">查看更多 ></div>
        </div>
        <div class="content-wrapper">
          <durian-item
            v-if="indexDurianList.length>0"
            class="item-wrapper"
            v-for="(item,key) in indexDurianList"
            :key="key"
            :data="item"
          >
          </durian-item>
          <div class="more-wrapper">
            点击查看更多 >
          </div>
        </div>
      </div>
    </div>
    <uni-footer></uni-footer>
  </div>
</template>

<script>
  import './index.styl'
  import {IndexBanner, IndexNotice, IndexHot, IndexDurianList, IndexUnreadNumber} from '@/api/index.js'
  import UniFooter from '@/components/uni-footer/uni-footer'
  import DurianItem from '@/components/durian-item/durian-item'

  export default {
    name: 'index',
    data() {
      return {
        indexBannerImg: [],
        indexBannerOption: {
          loop: true,
          autoplay: {
            delay: 4000
          }
        },
        indexNoticeOption: {
          loop: true,
          autoplay: {
            delay: 4000
          },
          direction: 'vertical'
        },
        indexNotice: [],
        menuFold: true,
        indexHot: [],
        indexDurianList: [],
        indexUnreadNumber: []

      }
    },
    created() {
      this._initBanner()
      this._initNotice()
      this._initHot()
      this._initDurianList()
      this._initUnreadNumber()
    },
    methods: {
      menuFoldClick() {
        this.menuFold = !this.menuFold
      },
      _initBanner() {
        IndexBanner().then((res) => {
          this.indexBannerImg = res.data.center
        })
      },
      _initNotice() {
        IndexNotice().then((res) => {
          this.indexNotice = res.data
        })
      },
      _initHot() {
        IndexHot().then((res) => {
          this.indexHot = res.data
        })
      },
      _initDurianList() {
        IndexDurianList().then((res) => {
          this.indexDurianList = res.data
        })
      },
      _initUnreadNumber() {
        IndexUnreadNumber().then((res) => {
          this.indexUnreadNumber = res.data
        })
      },
      _getImgUrl(url, large = '0') {
        if (large + '' === '0') {
          return window.setting.CDNImage + url
        } else {
          return url
        }
      }
    },
    components: {
      DurianItem,
      UniFooter
    }
  }
</script>
