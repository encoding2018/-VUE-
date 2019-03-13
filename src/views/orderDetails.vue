<template>
	<div class="content" ref="orderContent">
		<div class="subContent">
			<div class="siteBox">
				<titleBar :titleData="{title:'收货信息'}"/>
				<div class="siteBar" @click="selectSite">
					<div class="left">
						<div class="top">
							<span>{{pitchSite.name}}</span>
							<span>{{pitchSite.phone}}</span>
							<span></span>
						</div>
						<div class="bottom">
							<span>{{pitchSite.province}}</span>
							<span>{{pitchSite.city}}</span>
							<span>{{pitchSite.dist}}</span>
							<span>{{pitchSite.detailedSite}}</span>
						</div>
					</div>
					<div class="right"></div>
				</div>
			</div>
			<div class="payment">
				<titleBar :titleData="{title:'支付方式'}"/>
				<div class="payBox">
					<div class="payBar" v-for="(v,i) in payData" :key="i" @click="payId = i">
						<div></div>
						<div>{{v}}</div>
						<div :class="payId===i?'active':''"></div>
					</div>
				</div>
			</div>
			<div class="product">
				<titleBar :titleData="{title:'商品信息'}" :productNum="allNum"/>
				<div class="productBox">
					<div class="productBar" v-for="(item,i) in orderData" :key="i">
						<div class="left"><img :src="item.avatar" alt=""></div>
						<div class="right">
							<div class="top"><span>{{item.name}}</span><span>{{`(${item.type}•${item.color})`}}</span></div>
							<div class="bottom">
							<span>
								<span>￥</span>
								<span>{{`${item.price}.00`}}</span>
							</span>
								<span>
								<span>{{`x${item.quantity}`}}</span>
								<span></span>
							</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="invoice">
				<div class="top">
					<span>发票信息</span>
					<span><span>电子发票 · 个人 · 商品明细</span><span></span></span>
				</div>
				<div class="bottom">
					<span>优惠券</span>
					<span><span>无可用券</span><span></span></span>
				</div>
			</div>
			<div class="productDetails">
				<titleBar :titleData="{title:'商品详情'}"/>
				<div class="detailsBox">
					<div><span>商品总计</span><span>{{`+ ￥${allPrice}.00`}}</span></div>
					<div><span>运费</span><span>{{`+ ￥${carriage}.00`}}</span></div>
					<div><span>应付金额</span><span>{{`+ ￥${allPrice+carriage}.00`}}</span></div>
				</div>
			</div>
		</div>
		<div class="menuBar">
			<div><span>应付金额</span><span>{{`￥${shouldPrice}.00`}}</span></div>
			<div><btn title="现在支付" :fn="pay" size="big" :state="true"/></div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import titleBar from '../components/public/title_bar';
	import btn from '../components/public/button';
	import api from '../utils/api';
	import BScroll from 'better-scroll';
        export default {
                components:{titleBar,btn},
                data(){
			return{
			        payId:0,
				payData:['微信支付','支付宝','银联','花呗','工商银行','京东支付'],
				isInit:true
			}
                },
	        computed:{
		        orderData(){
                                return this.$store.state.order.orderData
		        },
		        allNum(){
                                let temp = 0; this.orderData.forEach(v=>temp+=v.quantity);
                                return temp;
		        },
		        allPrice(){
		                let all=0;
		                this.orderData.forEach(v=>{all+=(v.price*v.quantity)});
			        return all;
		        },
                        carriage(){
		                return 150 - this.allPrice >0 ? 15 : 0
                        },
                        shouldPrice(){
		                return this.allPrice+this.carriage;
                        },
		        pitchSite(){
		                return this.$store.state.site.pitchSite;
		        },

	        },
	        methods:{
                        _setIndexNavBtnState(){ // 设置nav状态
                                this.$store.commit('template/changeBtnState', {btn: ['Text','Back'], NavTextContent: '订单信息'});
                        },
                        _setFooterMenuState(payload){
                                this.$store.commit('template/changeFooterMenu', payload);
                        },
		        _initBScroll(){
                                this.orderBScroll = new BScroll(this.$refs.orderContent,{
                                        click:true,
                                        bounce:false
                                })
		        },
                        selectSite(){
                               this.$store.commit('site/changeSelect',{state:true});
                                this.$router.replace('/site');
                                this.isInit = false;
                        },
                        pay(){
                                let state = 1 , pid = [], { shouldPrice:price,pitchSite:{ id:siteId } } = this;
                                this.$store.state.order.orderData.forEach(({id,quantity})=>pid.push({pid:id,num:quantity}));
                                this.$http.post(api.order.ADD,{state,price,pid,siteId})
	                                .then(result=> result.ok)
	                                .then(result=>{
	                                        if(!result) return;
	                                        this.$store.commit('cart/changeInitState',true);   //开启购物车信息初始化开关
                                                this.$store.commit('order/changeInitState',true); //开启订单信息初始化开关
                                                this.$alert.info('订单提交成功');
                                                this.$store.commit('order/setOrder',[]);
                                                this.$router.push('/order/all/1');
		                                return new Promise(()=>{});
	                                })
	                                .then(()=>this.$alert.info('订单提交失败'))
                        },
	        },
	        activated(){
                        if(this.isInit) this.$store.dispatch('site/getSite',true); //获取地址信息
                        this._setIndexNavBtnState();
                        this._setFooterMenuState();
                        if(!this.orderData.length) this.$router.replace('/cart')
	        },
	        mounted(){
                        this._initBScroll();
	        },
	        updated(){

	        },
	        deactivated(){
                        this._setFooterMenuState(true);
	        }

        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.content
		overflow hidden
		background rgb(226,226,226)
		.subContent
			padding-bottom 1rem
			&>*
				background #fff
				margin-bottom 0.2rem
			.siteBox
				.siteBar
					padding 0.2rem 0.4rem
					display flex
					.left
						flex-grow 1
						.top
							margin-bottom 0.2rem
							font-weight 700
							color #333
							font-size 0.3rem
						.bottom
							font-size 0.24rem
							color #666
							&>*
								margin-right 0.1rem
					.right
						width 0.15rem
						background url("../assets/img/icon/next_black.png")
						background-position center
						background-size 0.15rem
						background-repeat no-repeat

			.payment
				.payBar
					padding 0.1rem 0.3rem
					display flex
					align-items center
					border-bottom 0.01rem solid rgba(100,100,100,0.1rem)
					div:first-child
						width 0.6rem
						height 0.6rem
						background-size 100%
						background-repeat no-repeat
						background-position center
						display flex
						align-items center
						img
							width 100%
					div:nth-child(2)
						padding-left 0.5rem
						flex-grow 1
						color #333333
						font-size 0.32rem
					div:last-child
						flex-shrink 0
						width 1rem
						height 0.4rem
					.active
						background-repeat no-repeat
						background-position center
						background-size 30%
						background-image  url("../assets/img/icon/icon-pay-check.png")
				.payBar:nth-child(1)>div:first-child
					background-image url("../assets/img/icon/icon-pay-1.png")
				.payBar:nth-child(2)>div:first-child
					background-image url("../assets/img/icon/icon-pay-2.png")
				.payBar:nth-child(3)>div:first-child
					background-image url("../assets/img/icon/icon-pay-3.png")
				.payBar:nth-child(4)>div:first-child
					background-image url("../assets/img/icon/icon-pay-4.png")
				.payBar:nth-child(5)>div:first-child
					background-image url("../assets/img/icon/icon-pay-5.png")
				.payBar:nth-child(6)>div:first-child
					background-image url("../assets/img/icon/icon-pay-6.png")
			.productBar
				padding 0.1rem 0.3rem
				display flex
				border-bottom 0.01rem solid rgba(100,100,100,0.2)
				.left
					flex-shrink 0
					width 1.6rem
					margin  0 0.5rem 0 0.3rem
					img
						width 100%
				.right
					flex-grow 1
					padding 0.2rem
					.top
						color #000
						font-weight 700
						font-size 0.27rem
						margin-bottom 0.2rem
					.bottom
						span
							font-weight 700
						&>span:first-child
							color rgb(212, 77, 68)
							font-size 0.27rem
						&>span:last-child
							font-size 0.24rem
							color rgb(153,153,153)
			.invoice
				padding 0.2rem
				&>div
					padding 0.2rem 0
					display flex
					justify-content space-between
					align-items center
					&>span:first-child
						font-size: 0.3rem;
						color: #000000;
						font-weight: 700;
					&>span:last-child
						display flex
						justify-items center
						font-size: 0.3rem;
						color: rgb(150,150,150);
						&>span:last-child
							width 0.1rem
							margin-left 0.2rem
							background-image url("../assets/img/icon/next_black.png")
							background-position center
							background-size 100%
							background-repeat no-repeat
			.productDetails
				.detailsBox
					&>div
						display flex
						padding 0.2rem 0.2rem
						border-bottom 0.01rem solid rgba(100,100,100,0.1)
						justify-content space-between
						&>span:first-child
							font-size 0.3rem
							color #333333
						&>span:last-child
							font-weight 700
							font-size 0.3rem
							color #333333
					&>div:last-child
						span:first-child
							font-weight 700
						span:last-child
							color rgb(212, 77, 68)


		.menuBar
			height 1rem
			width 100%
			position fixed
			bottom 0
			background #fff
			display flex
			padding 0.1rem 0.2rem
			&>div
				flex-grow 1
			&>div:first-child
				display flex
				align-items center
				span
					font-weight 700
				span:first-child
					font-size 0.25rem
					color #333333
					flex-grow 0.3
					text-align right
					margin-right 0.2rem
				span:last-child
					color #c4564b
					font-size 0.3rem

</style>