<template>
</template>

<script>
  import './index.styl'
  import {IndexBanner, IndexNotice, IndexHot, IndexDurianList, IndexUnreadNumber} from '@/api/index.js'
  import UniFooter from '@/components/uni-footer/uni-footer'
  import DurianItem from '@/components/durian-item/durian-item'

  export default {
    name: 'index',
    data() {

    },
    created() {

    },
    methods: {},
    components: {
      DurianItem,
      UniFooter
    }
  }
</script>
