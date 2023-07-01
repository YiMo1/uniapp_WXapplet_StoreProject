<template>
  <view class="goods_list">
    <view
      class="goods_item"
      v-for="item in goods"
      :key="item.id"
      @click="navigator(item.id)"
    >
      <image :src="item.img_url"></image>
      <view class="price">
        <text>￥{{ item.sell_price }}</text>
        <text>￥{{ item.market_price }}</text>
      </view>
      <view class="name">
        {{ item.title }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "GoodsList",
  props: ["goods"],
  data() {
    return {};
  },
  methods: {
    navigator(id) {
      this.$emit("goodsItemClick", id);
    },
  },
};
</script>

<style scoped lang="scss">
.goods_list {
  padding: 0 15rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .goods_item {
    background-color: #ffffff;
    width: 355rpx;
    margin: 10rpx 0;
    padding: 15rpx;
    box-sizing: border-box;

    image {
      width: 80%;
      height: 150rpx;
      display: block;
      margin: 0 auto;
    }

    .price {
      color: $shop_color;
      font-size: 36rpx;
      margin: 15rpx 0 5rpx;

      text:nth-child(2) {
        color: #ccc;
        font-size: 28rpx;
        margin-left: 17rpx;
        text-decoration: blink;
      }
    }

    .name {
      font-size: 28rpx;
      line-height: 50rpx;
      padding-bottom: 15rpx;
      padding-top: 10rpx;
    }
  }
}
</style>
