<template>
  <view class="goods_list">
    <GoodsList :goods="goods" @goodsItemClick="goDetail"></GoodsList>
    <view v-if="flag" class="isOver">----------我是有底线的-----------</view>
  </view>
</template>

<script>
import GoodsList from "@/components/goodsList/GoodsList.vue";

export default {
  components: { GoodsList },
  data() {
    return {
      pageIndex: 1,
      goods: [],
      flag: false,
    };
  },
  methods: {
    goDetail(id) {
      uni.navigateTo({
        url: "/pages/goodsDetail/GoodsDetail?id=" + id,
      });
    },
    async getGoodsList(callBack) {
      const result = await this.$myRequest({
        url: "/api/getgoods?pageindex=" + this.pageIndex,
      });
      if (callBack) callBack();
      if (result.data.message.length < 10) {
        this.flag = true;
      }
      this.goods = [...this.goods, ...result.data.message];
    },
  },
  onLoad() {
    this.getGoodsList();
  },
  onReachBottom() {
    if (this.flag) return;
    this.pageIndex++;
    this.getGoodsList();
  },
  onPullDownRefresh() {
    this.pageIndex = 1;
    this.goods = [];
    this.flag = false;
    this.getGoodsList(() => {
      uni.stopPullDownRefresh();
    });
  },
};
</script>

<style scoped lang="scss">
.goods_list {
  background-color: #eeeeee;

  .isOver {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 28rpx;
  }
}
</style>
