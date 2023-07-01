<template>
  <view>
    <view
      class="news_item"
      @click="handleClick(item.id)"
      v-for="item in list"
      :key="item.id"
    >
      <img :src="item.img_url" alt="" />
      <view class="right">
        <view class="tit">
          {{ item.title }}
        </view>
        <view class="info">
          <text>发表时间：{{ formatDate(item.add_time) }}</text>
          <text>浏览：{{ item.click }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: ["list"],
  name: "NewsItem",
  data() {
    return {
      e: 123123,
    };
  },
  methods: {
    handleClick(id) {
      this.$emit("itemClick", id);
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
};
</script>

<style scoped lang="scss">
.news_item {
  display: flex;
  padding: 10rpx 20rpx;
  border-bottom: 1px solid $shop_color;

  img {
    min-width: 200rpx;
    max-width: 200rpx;
    height: 175rpx;
  }

  .right {
    margin-left: 15rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .tit {
      font-size: 33rpx;
    }

    .info {
      font-size: 24rpx;

      text:nth-child(2) {
        margin-left: 30rpx;
      }
    }
  }
}
</style>
