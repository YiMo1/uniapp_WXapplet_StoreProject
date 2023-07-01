<template>
  <view class="pics">
    <scroll-view class="left" scroll-y>
      <view @click="handleClick(index,item.id)"
            :class="{'active':active === index}"
            v-for="(item,index) in cates" :key="item.id">
        {{ item.title }}
      </view>
    </scroll-view>
    <scroll-view class="right" scroll-y>
      <view class="item" v-for="item in secondData" :key="item.id">
        <img @click="previewImg(item.img_url)" :src="item.img_url" alt="">
        <text>{{ item.title }}</text>
      </view>
      <text v-if="secondData.length === 0">暂无数据</text>
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: "Pics",
  data() {
    return {
      cates: [],
      active: 0,
      secondData: [],
    }
  },
  methods: {
    previewImg(current) {
      const urls = this.secondData.map(item => {
        return item.img_url;
      })
      uni.previewImage({
        urls,
        current,
      })
    },
    async handleClick(index, id) {
      this.active = index;
      const result = await this.$myRequest({
        url: '/api/getimages/' + id,
      })
      this.secondData = result.data.message;
    },
    async getPicsCate() {
      const result = await this.$myRequest({
        url: '/api/getimgcategory'
      })
      this.cates = result.data.message;
      await this.handleClick(0, this.cates[0].id);
    }
  },
  onLoad() {
    this.getPicsCate();
  }
}
</script>

<style scoped lang="scss">
page {
  height: 100%;
}

.pics {
  height: 100%;
  display: flex;

  .left {
    width: 200rpx;
    height: 100%;
    border-right: 1px solid #eeeeee;

    view {
      height: 60px;
      line-height: 60px;
      color: #333333;
      text-align: center;
      font-size: 30rpx;
      border-top: 1px solid #eeeeee;
    }

    .active {
      background-color: $shop_color;
      color: #ffffff;
    }
  }

  .right {
    height: 100%;
    width: 530rpx;
    margin: 10rpx auto;

    .item {
      img {
        width: 530rpx;
        height: 530rpx;
        border-radius: 5px;
      }

      text {
        font-size: 30rpx;
        line-height: 60rpx;
      }
    }
  }
}
</style>
