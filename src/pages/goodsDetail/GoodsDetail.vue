<template>
	<view class="goods_detail">
		<swiper indicator-dots>
			<swiper-item v-for="item in swipers">
				<img :src="item.src" alt="" />
			</swiper-item>
		</swiper>
		<view class="box1">
			<view class="price">
				<text>￥{{ detailInfo.sell_price }}</text>
				<text>￥{{ detailInfo.market_price }}</text>
			</view>
			<view class="goods_name">
				{{ detailInfo.title }}
			</view>
		</view>
		<u-divider></u-divider>
		<view class="box2">
			<view>货号：{{ detailInfo.goods_no }}</view>
			<view>库存：{{ detailInfo.stock_quantity }}</view>
		</view>
		<u-divider></u-divider>
		<view class="box3">
			<view class="tit">详情介绍</view>
			<view class="content" v-html="detailContent"></view>
		</view>
		<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
			@buttonClick="buttonClick" />
	</view>
</template>

<script>
	import uniGoodsNav from "@/components/uni-goods-nav/uni-goods-nav.vue";

	export default {
		components: {
			uniGoodsNav
		},
		data() {
			return {
				swipers: [],
				detailInfo: {},
				detailContent: "",
				options: [{
						icon: "headphones",
						text: "客服",
					},
					{
						icon: "shop",
						text: "店铺",
					},
					{
						icon: "cart",
						text: "购物车",
						info: 0,
					},
				],
				buttonGroup: [{
						text: "加入购物车",
						backgroundColor: "#ff0000",
						color: "#fff",
					},
					{
						text: "立即购买",
						backgroundColor: "#ffa200",
						color: "#fff",
					},
				],
			};
		},
		methods: {
			async getSwipers(id) {
				const result = await this.$myRequest({
					url: "/api/getthumimages/" + id,
				});
				this.swipers = result.data.message;
			},
			async getDetailInfo(id) {
				const result = await this.$myRequest({
					url: "/api/goods/getinfo/" + id,
				});
				this.detailInfo = result.data.message[0];
			},
			async getDetailContent(id) {
				const result = await this.$myRequest({
					url: "/api/goods/getdesc/" + id,
				});
				this.detailContent = result.data.message[0].content;
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: "none",
				});
			},
			buttonClick(e) {
				this.options[2].info++;
			},
		},
		onLoad(option) {
			this.getSwipers(option.id);
			this.getDetailInfo(option.id);
			this.getDetailContent(option.id);
		},
	};
</script>

<style lang="scss">
	.goods_detail {
		swiper {
			height: 700rpx;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.box1 {
			padding: 10px;

			.price {
				font-size: 30rpx;
				color: $shop_color;

				text:nth-child(2) {
					color: #cccccc;
					font-size: 28rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.goods_name {
				font-size: 32rpx;
				line-height: 60rpx;
			}
		}

		.box2 {
			padding: 0 10px;
			font-size: 32rpx;
			line-height: 70rpx;
		}

		.box3 {
			.tit {
				font-size: 32rpx;
				padding-left: 10px;
				border-bottom: 1px solid #eeeeee;
				line-height: 70rpx;
			}

			.content {
				padding: 10px;
				font-size: 28rpx;
				color: #333333;
				line-height: 50rpx;
			}
		}
	}
</style>