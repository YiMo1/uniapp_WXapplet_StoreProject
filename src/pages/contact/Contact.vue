<template>
  <view class="contact">
    <img src="http://www.itcast.cn/2018czydz/image/gywmban.jpg" alt="">
    <view class="info">
      <view @click="callPhone">联系电话:400-618-9090 （点击拨打）</view>
      <view>校区地址:湖北省武汉市武昌区xx路xx区x单元</view>
    </view>
    <map class="map" :longitude="longitude" :latitude="latitude" :markers="markers"></map>
  </view>
</template>

<script>
export default {
  data() {
    return {
      longitude: 114.27161,
      latitude: 30.45882,
      markers: [
        {longitude: 114.27161, latitude: 30.45882, iconPath: '../../static/hmlogo.png', width: 30, height: 30}
      ]
    };
  },
  methods: {
    callPhone() {
      uni.makePhoneCall({
        phoneNumber: '400-618-9090'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.contact {
  img {
    width: 750rpx;
    height: 320rpx;
  }

  .info {
    padding: 10rpx 20rpx;
    font-size: 30rpx;

    view {
      border-bottom: 1px solid #eeeeee;
      line-height: 70rpx;
    }
  }

  .map {
    width: 750rpx;
    height: 750rpx;
  }
}
</style>
