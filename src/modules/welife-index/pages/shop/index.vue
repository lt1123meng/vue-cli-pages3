<template>
  <div class="shop-outer-wrapper">
    <div class="shop-content-wrapper">
      <div class="header-wrapper" :class="{'topnav':topnav}">
        <div class="search-wrapper">
          <div class="inner-box" @click="search">
            <img class="icon" src="/static/image/icon/icon-search.png">
            <span class="text">商铺名称/关键词</span>
          </div>
        </div>
        <nav class="choose-condition-wrapper">
          <div class="item-wrapper"
               :class="{'active':sortActive==='last'}"
               @click="sortChoose('last')">
            <span class="text">最新入驻</span>
            <div class="line"></div>
          </div>
          <div class="item-wrapper"
               :class="{'active':sortActive==='most'}"
               @click="sortChoose('most')">
            <span class="text">人气最高</span>
            <div class="line"></div>
          </div>
          <div class="item-wrapper">
            <span class="text">地区</span>
            <div class="line"></div>
          </div>
        </nav>
      </div>
      <div class="content-wrapper" ref="scrollArea">
        <div>
          <div class="ad-wrapper">
            <div class="icon-wrapper">
              <span class="text">最新入驻</span>
            </div>
            <swiper class="list-wrapper" v-if="ad.length>0" :options="adOption">
              <swiper-slide
                v-for="(item,key) in ad"
                :key="key"
                class="item"
              >
                <span v-html="item.text"></span>
              </swiper-slide>
            </swiper>
            <div class="button-wrapper">
              <button class="button" @click="createShop">我要入驻</button>
            </div>
          </div>
          <nav class="shop-type-wrapper">
            <div class="item-wrapper"
                 :class="{'active':item.id===chooseTypeActive}"
                 v-for="(item,key) in chooseType"
                 @click="chooseOneType(item)"
                 :key="key">
              <img class="icon" :src="getImg(item.icon)" alt="">
              <p class="text">{{item.name}}</p>
            </div>
          </nav>
          <nav class="choose-condition-wrapper">
            <div class="item-wrapper"
                 :class="{'active':sortActive==='last'}"
                 @click="sortChoose('last')">
              <span class="text">最新入驻</span>
              <div class="line"></div>
            </div>
            <div class="item-wrapper"
                 :class="{'active':sortActive==='most'}"
                 @click="sortChoose('most')">
              <span class="text">人气最高</span>
              <div class="line"></div>
            </div>
            <div class="item-wrapper" @click="goCity">
              <span class="text">{{city_name}}</span>
              <img src="/static/image/icon/icon-solid-triangle-999.png" class="icon">
              <div class="line"></div>
            </div>
          </nav>
          <loading v-show="shopList===''" :flag="shopList===''"></loading>
          <div v-if="shopList===''"></div>
          <empty v-else-if="shopList.length===0"></empty>
          <div v-else>
            <div
              v-for="(item,key) in shopList"
              :key="key"
            >
              <shop-item @detail="goDetail" :data="item"></shop-item>
            </div>
            <div class="loading-wrapper" v-show="flag">
              <img src="/static/image/system/loading-tail.gif" class="icon">
            </div>
            <deadline v-if="finish"></deadline>
          </div>
        </div>
      </div>
    </div>
    <uni-footer></uni-footer>
    <router-view @cityChange="cityChange"/>
  </div>
</template>

<script>
  import './index.styl'
  import {getCookie} from '@/utils/common.js'
  import {Share} from '@/api/index.js'
  import {ShopChooseType, ShopAD, ShopList} from '@/api/shop.js'
  import Loading from '@/components/loading/loading'
  import UniFooter from '@/components/uni-footer/uni-footer'
  import ShopItem from '@/components/shop-item/shop-item'
  import Deadline from '@/components/deadline/deadline'
  import Empty from '@/components/empty/empty'

  export default {
    name: 'index',
    data() {
      return {
        city_id: 0,
        city_name: '地区',
        flag: false,
        finish: false,
        topnav: false,
        ad: [],
        adOption: {
          loop: true,
          autoplay: {
            delay: 4000
          },
          direction: 'vertical'
        },
        chooseType: [],
        chooseTypeActive: '',
        sortActive: 'last',
        shopList: ''
      }
    },
    created() {
      if (sessionStorage.pos) {
        this.pos = JSON.parse(sessionStorage.pos)
        this.chooseTypeActive = this.pos.chooseTypeActive
        this.sortActive = this.pos.sortActive
      }
      this._initWx()
      this.page = 0
      this._initChooseType()
      this._initAD()
      this.city_id = getCookie('city_id_food') || 0
      this.city_name = getCookie('city_name_food') || '地区'
      this._initSet()
    },
    mounted() {
      this.$refs.scrollArea.addEventListener('scroll', this._scroll)
    },
    methods: {
      goCity() {
        this.$router.push('/shop/city')
      },
      goDetail() {
        var sessionParams = {
          chooseTypeActive: this.chooseTypeActive,
          pos: this.$refs.scrollArea.scrollTop,
          sortActive: this.sortActive,
          length: this.shopList.length
        }
        sessionStorage.pos = JSON.stringify(sessionParams)
      },
      search() {
        window.location.href = window.setting.HTTPURL + 'addons/welife_food/index.html#/search'
      },
      createShop() {
        if (!window.user || window.user.token === '' || !window.user.token) {
          this.$root.$children[0].loginShow = true
          return false
        }
        window.location.href = window.setting.HTTPURL + 'addons/welife_admin/index.html#/adminupload'
      },
      getImg(url) {
        return window.setting.CDNStatic + url
      },
      chooseOneType(item) {
        if (this.flag) {
          return
        }
        if (this.chooseTypeActive === item.id) {
          this.chooseTypeActive = ''
        } else {
          this.chooseTypeActive = item.id
        }
        this._initSet()
      },
      sortChoose(type) {
        if (this.flag) {
          return
        }
        if (this.sortActive === type) {

        } else {
          this.sortActive = type
        }
        this._initSet()
      },
      cityChange(item) {
        if (item.name === '英国') {
          this.city_name = '地区'
          this.city_id = '0'
        } else {
          this.city_id = item.id
          this.city_name = item.name
        }
        this._initSet()
      },
      _scroll(e) {
        if (e.target.scrollTop > 650) {
          this.topnav = true
        } else {
          this.topnav = false
        }
        if (e.target.scrollTop + e.target.clientHeight > e.target.children[0].clientHeight - 200) {
          this._initShopList()
        }
      },
      _initSet() {
        this.page = 0
        this.shopList = ''
        this.finish = false
        this._initShopList()
      },
      _initChooseType() {
        ShopChooseType().then((res) => {
          console.log(res)
          if (res.status) {
            this.chooseType = res.data
          }
        })
      },
      _initAD() {
        ShopAD().then((res) => {
          console.log(res)
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].text =
              res.data[i].text.replace(
                res.data[i].highlight,
                '<span class="high-light">' + res.data[i].highlight + '</span>'
              )
            this.ad = res.data
          }
        })
      },
      _initShopList() {
        if (this.flag || this.finish) {
          return
        }
        this.flag = true
        this.page++
        let params = {
          page: this.page,
          page_size: 10,
          city_id: this.city_id,
          type_id: this.chooseTypeActive,
          sort: this.sortActive,
          keywords: ''
        }
        if (this.pos) {
          params.page_size = this.pos.length
        }
        let time = false
        let http = false
        let httpres = ''
        let setData = () => {
          if (httpres.status) {
            if (httpres.data.list.length !== 10) {
              this.finish = true
            }
            if (this.shopList === '') {
              this.shopList = httpres.data.list
            } else {
              this.shopList = this.shopList.concat(httpres.data.list)
            }
          }
          if (this.pos) {
            this.$nextTick(() => {
              setTimeout(() => {
                this.$refs.scrollArea.scrollTop = this.pos.pos
                sessionStorage.removeItem('pos')
                this.pos = ''
              }, 200)
            })
          }
          this.flag = false
          this.$forceUpdate()
        }
        setTimeout(() => {
          if (http === true) {
            setData()
          } else {
            time = true
          }
        }, 200)
        ShopList(params).then((res) => {
          httpres = res
          if (time === true) {
            setData()
          } else {
            http = true
          }
        })
      },
      _initWx() {
        let sharedata = {
          title: '英国口碑商家',
          desc: '美食 购物 租房 超市 交通 物流 职业',
          link: window.location.href + '?share=share',
          imgUrl: window.setting.HTTPVUE + 'static/image/system/sellerShareImg.png',
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
      }
    },
    activated() {
      this._initWx()
    },
    components: {
      Loading,
      Deadline,
      ShopItem,
      UniFooter,
      Empty
    }
  }
</script>
