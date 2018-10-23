<template>
  <div class="durian-outer-wrapper">
    <div class="durian-content-wrapper">
      <div class="header-wrapper">
        <div class="search-wrapper">
          <div class="inner-box">
            <img class="icon" src="/static/image/icon/icon-search.png">
            <span class="text">搜索关键词</span>
          </div>
        </div>
        <div class="topic-list">
          <div class="topic" v-for="(item,key) in topicList" :key="key">
            <span class="text">{{item.text}}</span>
            <div class="line"></div>
          </div>
        </div>
      </div>
      <div class="content-wrapper">

      </div>
    </div>
    <uni-footer></uni-footer>
  </div>
</template>

<script>
  import './index.styl'
  import {TopicList} from '@/api/topic.js'
  import {PostList} from '@/api/post.js'
  import UniFooter from '@/components/uni-footer/uni-footer'
  import DurianItem from '@/components/durian-item/durian-item'

  export default {
    name: 'index',
    data() {
      return {
        topicList: [{
          id: '-1',
          text: '全部'
        },
          {
            id: '-2',
            text: '话题'
          }
        ]
      }
    },
    created() {
      this._initTopicList()
      this._initPostList()
    },
    methods: {
      _initTopicList() {
        TopicList().then((res) => {
          this.indexBannerImg = res.data.center
        })
      },
      _initPostList() {
        PostList().then((res) => {
          this.indexBannerImg = res.data.center
        })
      }
    },
    components: {
      DurianItem,
      UniFooter
    }
  }
</script>
