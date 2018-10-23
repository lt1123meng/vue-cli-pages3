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
      <div class="content-wrapper post" v-if="activeTopic!=='-2'" ref="scrollArea">
        <loading v-if="postList===''"></loading>
        <div v-else>
          <div
            v-for="(item,key) in postList"
            :key="key"
          >
            <durian-item
              v-if="postList.length>0"
              class="item-wrapper"
              :data="item"
            >
            </durian-item>
            <div class="essence-wrapper" v-if="essence!==''&&key===1">
              <div class="border">
                <div class="title-wrapper">
                  <div class="title">精华帖</div>
                  <div class="more">
                    <span class="text">精华帖</span>
                    <img src="/static/image/icon/icon-solid-triangle-999.png" class="icon">
                  </div>
                </div>
                <div class="bg-img">
                  <div class="wrapper">
                    <div class="time">{{essence.num_view}}人浏览</div>
                    <div class="time">{{essence.create_at}}</div>
                  </div>
                </div>
                <div class="post-title">
                  <img src="/static/image/icon/icon_essence.png" class="icon">
                  <span class="text">{{essence.post_title}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="loading-wrapper" v-show="flag">
            <img src="/static/image/system/loading-tail.gif" class="icon">
          </div>
          <div class="deadline" v-if="postFinish">
            <div class="text">我是有底线的</div>
          </div>
        </div>
      </div>
      <div class="content-wrapper topic" v-else>
        <loading v-if="postList===''"></loading>
        <div v-else>
          <div
            class="topic-wrapper"
            :class="{'bg':item.banner_img}"
            v-for="(item,key) in topicList"
            :key="key"
            :style="'background-image: url('+_getImgUrl(item.banner_img)+')'"
          >
            <div class="linear-gradient"></div>
            <div class="post-title">
              #{{item.title}}#
            </div>
            <div class="tail">
              <div class="item see">
                {{item.num_view}}
              </div>
              <div class="item message">
                {{item.num_comment}}
              </div>
              <div class="item zan">
                {{item.num_praise}}
              </div>
            </div>
          </div>
        </div>
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
  import Loading from '@/components/loading/loading'

  export default {
    name: 'index',
    data() {
      return {
        activeTopic: '-1',
        topicTitleList: [{
          id: '-1',
          title: '全部'
        }, {
          id: '-2',
          title: '话题'
        }],
        topicList: '',
        essence: '',
        postList: '',
        flag: false,
        postFinish: false
      }
    },
    created() {
      this._initSet()
      this._initTopicList()
    },
    mounted() {
      this.$refs.scrollArea.addEventListener('scroll', this._scroll)
    },
    methods: {
      chooseTopic(topic) {
        this.activeTopic = topic.id
        if (this.activeTopic !== '-2') {
          this._initSet()
        } else {
          if (this.topicList === '') {
            this._initTopicList(3)
          }
        }
      },
      _initSet() {
        this.postFinish = false
        this.postList = ''
        this.page = 0
        this.flag = false
        this._initPostList()
      },
      _scroll(e) {
        if (e.target.scrollTop + e.target.clientHeight > e.target.children[0].clientHeight - 200) {
          this._initPostList()
        }
      },
      _initTopicList(type = 2) {
        TopicList(type).then((res) => {
          if (res.status) {
            if (type === 3) {
              this.topicList = res.data.list
            } else {
              this.topicTitleList = this.topicTitleList.concat(res.data.list)
            }
          }
        })
      },
      _initPostList() {
        if (this.flag || this.postFinish) {
          return
        }
        this.flag = true
        this.page++
        PostList(this.activeTopic, this.page).then((res) => {
          if (res.status) {
            if (res.data.post.length !== 10) {
              this.postFinish = true
            }
            if (this.postList === '') {
              this.postList = res.data.post
            } else {
              this.postList = this.postList.concat(res.data.post)
            }
            if (this.activeTopic === '-1' && this.page === 1) {
              this.essence = res.data.essence
            }
          }
          this.flag = false
        })
      },
      _getImgUrl(img) {
        return window.setting.CDNImage + img
      }
    },
    components: {
      DurianItem,
      UniFooter,
      Loading
    }
  }
</script>
