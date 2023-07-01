<template>
  <view class="news">
    <newsItem :list="newsList" @itemClick="goDetail"></newsItem>
  </view>
</template>

<script>
import newsItem from "@/components/newsItem/NewsItem.vue";

export default {
  components: { newsItem },
  data() {
    return {
      newsList: [],
    };
  },
  methods: {
    goDetail(id) {
      uni.navigateTo({
        url: "/pages/newsDetail/NewsDetail?id=" + id,
      });
    },
    async getNews() {
      const result = await this.$myRequest({
        url: "/api/getnewslist",
      });
      this.newsList = result.data.message;
    },
  },
  onLoad() {
    this.getNews();
  },
};
</script>

<style scoped lang="scss"></style>
