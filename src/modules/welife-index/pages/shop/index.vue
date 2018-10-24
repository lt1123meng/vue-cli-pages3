<template>
  <div class="shop-outer-wrapper">
    <div class="shop-content-wrapper">
      <div class="header-wrapper">
        <div class="search-wrapper">
          <div class="inner-box">
            <img class="icon" src="/static/image/icon/icon-search.png">
            <span class="text">商铺名称/关键词</span>
          </div>
        </div>
        <div class="topic-list">
          <div
            class="topic"
            v-for="(item,key) in topicTitleList"
            :class="{'active':item.id===activeTopic}"
            :key="key"
            @click="chooseTopic(item)"
          >
            <span class="text">{{item.title}}</span>
            <div class="line"></div>
          </div>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="ad-wrapper">
          <div class="icon-wrapper">
            <span class="text">最新入驻</span>
          </div>
          <swiper class="list-wrapper" :option="adOption">
            <swiper-slide
              class="item"
            >
              111111
            </swiper-slide>
          </swiper>
          <div class="button-wrapper">
            <button class="button">我要入驻</button>
          </div>
        </div>
        <nav class="shop-type-wrapper">
          <div class="item-wrapper">
            <img class="icon" src="/static/image/menu/shop-food.png" alt="">
            <p class="text">餐饮美食</p>
          </div>
          <div class="item-wrapper">
            <img class="icon" src="/static/image/menu/shop-shop.png" alt="">
            <p class="text">时尚购物</p>
          </div>
          <div class="item-wrapper">
            <img class="icon" src="/static/image/menu/shop-logistics.png" alt="">
            <p class="text">快递物流</p>
          </div>
          <div class="item-wrapper">
            <img class="icon" src="/static/image/menu/shop-study.png" alt="">
            <p class="text">留学服务</p>
          </div>
          <div class="item-wrapper">
            <img class="icon" src="/static/image/menu/shop-play.png" alt="">
            <p class="text">休闲娱乐</p>
          </div>
          <div class="item-wrapper">
            <img class="icon" src="/static/image/menu/shop-market.png" alt="">
            <p class="text">超市</p>
          </div>
          <div class="item-wrapper">
            <img class="icon" src="/static/image/menu/shop-law.png" alt="">
            <p class="text">法律服务</p>
          </div>
          <div class="item-wrapper">
            <img class="icon" src="/static/image/menu/shop-work.png" alt="">
            <p class="text">职业发展</p>
          </div>
        </nav>
        <nav class="choose-condition-wrapper">
          <div class="item-wrapper active">
            <span class="text">最新入驻</span>
            <div class="line"></div>
          </div>
          <div class="item-wrapper">
            <span class="text">人气最高</span>
            <div class="line"></div>
          </div>
          <div class="item-wrapper">
            <span class="text">地区</span>
            <div class="line"></div>
          </div>
        </nav>
      </div>
    </div>
    <uni-footer></uni-footer>
  </div>
</template>

<script>
  import './index.styl'
  import {ShopChooseType, ShopAD, ShopList} from '@/api/shop.js'
  import UniFooter from '@/components/uni-footer/uni-footer'

  export default {
    name: 'index',
    data() {
      return {
        adOption: {
          loop: true,
          autoplay: {
            delay: 4000
          },
          direction: 'vertical'
        }
      }
    },
    created() {
      this._initChooseType()
      this._initAD()
      this._initShopList()
    },
    methods: {
      _initChooseType() {
        ShopChooseType().then((res) => {
          console.log(res)
        })
      },
      _initAD() {
        ShopAD().then((res) => {
          console.log(res)
        })
      },
      _initShopList() {
        ShopList().then((res) => {
          console.log(res)
        })
      }
    },
    components: {
      UniFooter
    }
  }
</script>
