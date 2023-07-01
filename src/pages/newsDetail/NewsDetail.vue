<template>
  <view class="news_detail">
    <text class="title">{{ detail.title }}</text>
    <view class="info">
      <text>发表时间：{{ formatDate(detail.add_time) }}</text>
      <text>浏览：{{ detail.click }}</text>
    </view>
    <view class="content" v-html="detail.content"></view>
  </view>
</template>

<script>
export default {
  data() {
    return { detail: {} };
  },
  methods: {
    async getNewsDetail(id) {
      const result = await this.$myRequest({
        url: "/api/getnew/" + id,
      });
      this.detail = result.data.message[0];
    },
  },
  computed: {
    formatDate() {
      return (date) => {
        const nDate = new Date(date);
        const year = nDate.getFullYear();
        const month = nDate.getMonth().toString().padStart(2, 0);
        const day = nDate.getDay().toString().padStart(2, 0);
        return year + "-" + month + "-" + day;
      };
    },
  },
  onLoad(option) {
    this.getNewsDetail(option.id);
  },
};
</script>

<style lang="scss">
.news_detail {
  font-size: 30rpx;
  padding: 0 20rpx;

  .title {
    text-align: center;
    width: 710rpx;
    display: block;
    margin: 20rpx 0;
  }

  .info {
    display: flex;
    justify-content: space-between;
  }
}
</style>
