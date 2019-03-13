<template>
	<div class="content">
		<div class="title-box">
			<div v-for="(v,i) in topMenu" :key="i" :class="i===0?'active':''">{{v}}</div>
		</div>
		<div class="subContent" ref="scrollContent">
			<div class="BScrollContent">
				<div class="orderBar" v-for="(item,i) in allOrder">
					<div class="title">
						<div class="timeBox"><span class="timeTitle">订单日期</span><span class="time">{{item.time.replace('T',' ').replace(':00.000Z','')}}</span></div>
						<div class="orderState">{{item.state==='1'?'待付款':'已关闭'}}</div>
					</div>
					<div class="cont">
						<div v-if="item.data.length===1" class="product1" v-for="item2 in item.data">
							<div ><img :src="item2.avatar" alt=""></div>
							<div class="msgBox">
								<div>{{`${item2.name}(${item2.subtitle||item2.title})`}}</div>
								<div><span>{{`￥${item2.price}.00`}}</span><span>{{`x${item2.ordernum}`}}</span></div>
							</div>
						</div>
						<div v-if="item.data.length>=2" class="product2">
							<div  v-for="item2 in item.data">
								<img :src="item2.avatar" alt="">
							</div>
						</div>
						</div>
					<div class="price">
						<span>实付金额</span><span>{{`￥${item.price}.00`}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {createNamespacedHelpers} from 'vuex';
	const {mapState,mapActions} =createNamespacedHelpers('order');
	import imagesLoaded from 'imagesloaded';
	import BScroll from 'better-scroll';
        export default {
                data(){
                        return{
                                topMenu:['全部','待付款','待收货','已完成']
                        }
                },
	        computed:{
                        ...mapState(['allOrder'])
	        },
	        methods:{
                        ...mapActions(['getAllOrder']),
                        _setIndexNavBtnState(){ // 设置nav状态
                                this.$store.commit('template/changeBtnState', {btn: ['Text','Back'], NavTextContent: '我的订单'});
                        },
                        _setFooterMenuState(payload){
                                this.$store.commit('template/changeFooterMenu', payload);
                        },
		        initBScroll(){
                                if(this.BScroll) return;
                                imagesLoaded(this.$refs.scrollContent,()=>{
                                        this.BScroll = new BScroll(this.$refs.scrollContent,{
                                                click:true
                                        })
                                });
		        }
	        },
	        activated(){
                        this._setIndexNavBtnState();
                        this._setFooterMenuState();
                        this.getAllOrder();

                },
	        mounted(){

	        },
	        updated(){
                        this.initBScroll();
	        },
	        deactivated(){
                        this._setFooterMenuState(true);
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	$border = 0.01rem solid rgba(96, 96, 96, 0.2);
	.content
		display flex
		flex-direction column
		background rgb(226,226,226)
		.title-box
			flex-shrink 0
			height 1rem
			padding 0.2rem
			display flex
			background rgb(242, 242, 242)
			box-shadow 0 0.1rem 0.26rem rgba(0, 0, 0, .12)
			position relative
			top 0
			z-index 1

			.active
				background rgb(176, 176, 176)
				color rgb(238, 238, 238)

			div
				flex-grow 1
				text-align center
				line-height 0.6rem
				border-top $border
				border-bottom $border
				border-right $border
				font-weight 700
				color rgb(96, 96, 96)
				font-size 0.3rem

			div:first-child
				border-left $border
				border-bottom-left-radius 0.1rem
				border-top-left-radius 0.1rem

			div:last-child
				border-bottom-right-radius 0.1rem
				border-top-right-radius 0.1rem
		.subContent
			overflow hidden
			flex-grow 1
			.orderBar
				background #fff
				margin-bottom 0.2rem
				.title
					display flex
					justify-content space-between
					padding 0.2rem 0.3rem
					border-bottom 0.01rem solid rgba(100,100,100,0.1)
					.timeBox
						span
							font-weight 700
						.timeTitle
							font-size 0.24rem
							color rgb(153,153,153)
							margin-right 0.2rem
						.time
							font-size 0.3rem
							color rgb(101,101,101)
					.orderState
						font-size 0.32rem
						color rgb(101,101,101)
						font-weight  700
				.cont
					.product1
						display flex
						div:first-child
							width 2rem
							flex-shrink 0
							img
								width 100%
						.msgBox
							flex-grow 1
							display flex
							flex-direction column
							justify-content center
							padding-left 0.5rem
							div
								width 100%
							div:first-child
								margin-bottom 0.2rem
								font-size 0.26rem
								color#333
								font-weight 600
							div:last-child
								span:first-child
									font-size 0.3rem
									font-weight 700
									color #d44d44
									margin-right 0.2rem
								span:last-child
									font-size 0.22rem
									font-weight 700
									color #999
					.product2
						display flex
						div
							width 2rem
							img
								width 100%
				.price
					padding 0.2rem 0.3rem
					border-top 0.01rem solid rgba(100,100,100,0.1)
					span:first-child
						font-size 0.24rem
						font-weight 700
						color rgb(153,153,153)
						margin-right 0.2rem
					span:last-child
						font-size 0.35rem
						font-weight 700
						color #d44d44

</style>