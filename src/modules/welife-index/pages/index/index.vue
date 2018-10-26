<template>
  <div class="index-outer-wrapper">
    <div class="index-content-wrapper" ref="scrollArea">
      <div>
        <div class="banner-wrapper">
          <swiper v-if="indexBannerImg.length>0" class="banner" ref="bannerSwiper" :options="indexBannerOption">
            <swiper-slide
              class="banner-slide"
              v-for="(item,key) in indexBannerImg"
              :key="key"
              :style="'background-image: url('+_getImgUrl(item.img_banner,'0')+')'"
            >
            </swiper-slide>
          </swiper>
          <div class="address" @click="goCity">
            <span class="text">{{city_name}}</span>
            <img src="/static/image/icon/icon-solid-triangle-fff.png" class="icon">
          </div>
          <div class="message" @click="goMessage">
            <img src="/static/image/icon/icon-message-line-white.png" class="icon">
            <span class="num" v-if="indexUnreadNumber!==0">{{indexUnreadNumber}}</span>
          </div>
        </div>
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
              <div class="right" @click="noticeClick(item)">
                <span class="text">{{item.data_type}}</span>
                <img class="icon" src="/static/image/icon/icon-circle-next.png">
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <nav class="menu-wrapper" :class="{'spread':menuFold===false}">
          <div class="wrapper">
            <div class="item-box" @click="menuClick('旅游')">
              <img class="icon" src="/static/image/menu/tourism.png">
              <p class="text">旅游</p>
            </div>
            <div class="item-box" @click="menuClick('拼团购')">
              <img class="icon" src="/static/image/menu/shop.png">
              <p class="text">拼团购</p>
            </div>
            <div class="item-box" @click="menuClick('二手')">
              <img class="icon" src="/static/image/menu/second.png">
              <p class="text">二手</p>
            </div>
            <div class="item-box" @click="menuClick('租房')">
              <img class="icon" src="/static/image/menu/rent-home.png">
              <p class="text">租房</p>
            </div>
            <div class="item-box" @click="menuClick('物流')">
              <img class="icon" src="/static/image/menu/logistics.png">
              <p class="text">物流</p>
            </div>
            <div class="item-box" @click="menuClick('专车')">
              <img class="icon" src="/static/image/menu/rent-car.png">
              <p class="text">专车</p>
            </div>
            <div class="item-box" @click="menuClick('最IN海外')">
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
            <div class="right" @click="goHotList">查看更多 ></div>
          </div>
          <div class="content-wrapper">
            <div
              class="item-wrapper"
              v-for="(item,key) in indexHot.list"
              :key="key"
              @click="goHotListDetail(item)"
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
            <div class="right" @click="goDurian">查看更多 ></div>
          </div>
          <div class="content-wrapper" v-if="indexDurianList.length>0">
            <durian-item
              class="item-wrapper"
              v-for="(item,key) in indexDurianList"
              :key="key"
              :data="item"
              @detail="goDetail"
            >
            </durian-item>
            <div class="more-wrapper" @click="goDurian">
              点击查看更多 >
            </div>
          </div>
        </div>
      </div>
    </div>
    <uni-footer></uni-footer>
    <router-view @cityChange="cityChange"/>
    <packet :scroll="scrollTop"></packet>
  </div>
</template>

<script>
  import './index.styl'
  import {getCookie} from '@/utils/common.js'
  import {Share, IndexBanner, IndexNotice, IndexHot, IndexDurianList, IndexUnreadNumber} from '@/api/index.js'
  import UniFooter from '@/components/uni-footer/uni-footer'
  import DurianItem from '@/components/durian-item/durian-item'
  import Packet from '@/components/index-packet/index-packet'

  export default {
    name: 'index',
    data() {
      return {
        scrollTop: 0,
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
        indexUnreadNumber: 0

      }
    },
    created() {
      if (sessionStorage.pos) {
        this.pos = JSON.parse(sessionStorage.pos)
      }
      this._initWx()
      this._initBanner()
      this._initNotice()
      this._initHot()
      this._initDurianList()
      this._initUnreadNumber()
      this.city_id = getCookie('city_id_food') || 0
      this.city_name = getCookie('city_name_food') || '英国'
    },
    mounted() {
      this.$refs.scrollArea.addEventListener('scroll', this._scroll)
    },
    methods: {
      goCity() {
        this.$router.push('/index/city')
      },
      cityChange(item) {
        if (item.name === '英国') {
          this.city_name = '英国'
          this.city_id = '0'
        } else {
          this.city_id = item.id
          this.city_name = item.name
        }
      },
      menuFoldClick() {
        this.menuFold = !this.menuFold
      },
      noticeClick(item) {
        if (item.data_type === '商家入驻') {
          window.location.href = window.setting.HTTPURL + 'addons/welife_admin/index.html#/adminupload'
        }
      },
      goHotList() {
        window.location.href = window.setting.HTTPURL + 'addons/welife_cms/index.html#/'
      },
      goHotListDetail(item) {
        window.location.href = window.setting.HTTPURL + 'addons/welife_cms/index.html#/detail/2/' + item.id
      },
      goDurian() {
        this.$router.push('/durian')
      },
      goDetail() {
        var sessionParams = {
          pos: this.$refs.scrollArea.scrollTop
        }
        sessionStorage.pos = JSON.stringify(sessionParams)
      },
      goMessage() {
        if (!window.user || window.user.token === '' || !window.user.token) {
          this.$root.$children[0].loginShow = true
          return false
        }
        window.location.href = window.setting.HTTPURL + 'addons/welife_mine/index.html#/newslist'
      },
      menuClick(type) {
        let _url = ''
        if (type === '旅游') {
          _url = window.setting.HTTPURL + 'addons/welife_travel/index.html'
        } else if (type === '拼团购') {
          _url = window.setting.HTTPURL + 'app/index.php?i=9&c=entry&do=index&m=welife_familyshop#'
          let startTime = localStorage.getItem('local_storage_haiwaiuni_at_data_startTime')
          let endTime = new Date().getTime()
          // eslint-disable-next-line
          _at.push('path', {
            'url': 'welife_familyshop',
            'referrer': document.referrer,
            'online_time': endTime - startTime
          })
          localStorage.setItem('local_storage_haiwaiuni_at_data_startTime', new Date().getTime())
        } else if (type === '二手') {
          _url = window.setting.HTTPURL + 'addons/welife_second/index.html'
        } else if (type === '租房') {
          _url = window.setting.HTTPURL + 'addons/welife_rent/index.html'
        } else if (type === '物流') {
          _url = window.setting.HTTPURL + 'addons/welife_mine/maneIndex.html#/log'
        } else if (type === '专车') {
          _url = window.setting.HTTPURL + 'addons/welife_carRent/index.html'
        } else if (type === '最IN海外') {
          _url = window.setting.HTTPURL + 'addons/welife_oversea/index.html'
        }
        window.location.href = _url
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
        if (this.pos) {
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.scrollArea.scrollTop = this.pos.pos
              sessionStorage.removeItem('pos')
              this.pos = ''
            }, 400)
          })
        }
        IndexDurianList().then((res) => {
          this.indexDurianList = res.data
        })
      },
      _initUnreadNumber() {
        if (!window.user || window.user.token === '' || !window.user.token) {
          return false
        }
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
      },
      _initWx() {
        let sharedata = {
          title: '英国由你',
          desc: '英国华人留学生社区及论坛',
          link: window.location.href + '?share=share',
          imgUrl: window.setting.HTTPVUE + 'static/image/system/logo-zheng.png',
          success: function () {
            // 分享帖子接口
            Share()
          },
          cancel: function () {
          }
        }
        setTimeout(function () {
          window.wx.ready(function () {
            window.wx.onMenuShareAppMessage(sharedata)
          })
          // 分享朋友圈
          window.wx.ready(function () {
            window.wx.onMenuShareTimeline(sharedata)
          })
        }, 0)
      },
      _scroll(e) {
        if (e.target.scrollTop) {
          this.scrollTop = e.target.scrollTop
          this.$forceUpdate()
        }
      }
    },
    components: {
      DurianItem,
      UniFooter,
      Packet
    },
    activated() {
      this._initWx()
    }
  }
</script>
