<template>
  <view class="home">
    <swiper indicator-dots autoplay circular>
      <swiper-item v-for="item in swiper" :key="item.id">
        <img :src="item.img" alt="" />
      </swiper-item>
    </swiper>
    <view class="nav">
      <view
        class="nav_item"
        v-for="item in navs"
        @click="navItemClick(item.path)"
      >
        <view :class="item.icon"></view>
        <text>{{ item.title }}</text>
      </view>
    </view>
    <view class="hot_goods">
      <view class="tit">推荐商品</view>
      <GoodsList :goods="goods" @goodsItemClick="goGoodsDetail"></GoodsList>
    </view>
  </view>
</template>

<script>
import GoodsList from "@/components/goodsList/GoodsList.vue";

export default {
  components: { GoodsList },
  data() {
    return {
      swiper: [],
      goods: [],
      navs: [
        {
          icon: "iconfont icon-ziyuan",
          title: "黑马超市",
          path: "/pages/goods/Goods",
        },
        {
          icon: "iconfont icon-guanyuwomen",
          title: "联系我们",
          path: "/pages/contact/Contact",
        },
        {
          icon: "iconfont icon-tupian",
          title: "社区图片",
          path: "/pages/pics/Pics",
        },
        {
          icon: "iconfont icon-shipin",
          title: "学习视频",
          path: "/pages/videos/Videos",
        },
      ],
    };
  },
  onLoad() {
    this.getSwiper();
    this.getHotGoods();
  },
  methods: {
    goGoodsDetail(id) {
      uni.navigateTo({
        url: "/pages/goodsDetail/GoodsDetail?id=" + id,
      });
    },
    async getSwiper() {
      const result = await this.$myRequest({
        url: "/api/getlunbo",
      });
      this.swiper = result.data.message;
    },
    async getHotGoods() {
      const result = await this.$myRequest({
        url: "/api/getgoods?pageindex=1",
      });
      this.goods = result.data.message;
    },
    navItemClick(path) {
      uni.navigateTo({
        url: path,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  swiper {
    width: 750rpx;
    height: 380rpx;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .nav {
    display: flex;

    .nav_item {
      width: 25%;
      text-align: center;

      view {
        width: 120rpx;
        height: 120rpx;
        background-color: $shop_color;
        border-radius: 60rpx;
        margin: 10px auto;
        line-height: 120rpx;
        color: #ffffff;
        font-size: 50rpx;
      }

      .icon-tupian {
        font-size: 45rpx;
      }

      text {
        font-size: 30rpx;
      }
    }
  }

  .hot_goods {
    background-color: #eee;
    overflow: hidden;
    margin-top: 10px;

    .tit {
      height: 50px;
      line-height: 50px;
      color: $shop_color;
      text-align: center;
      letter-spacing: 20px;
      background-color: #ffffff;
      margin: 7rpx auto;
    }

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
  }
}
</style>
