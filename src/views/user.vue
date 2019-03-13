<template>
	<div class="content user bgColor-228" ref="userContent">
		<div class="subContent">
			<div class="top-placeholder"></div>
			<div class="userState">
				<div class="top">
					<router-link :to="$store.state.isLogin?'/center':'/user/login'">
						<div><img src="@assets/img/icon/icon_user_avatar.png" alt=""></div>
						<div>{{$store.state.username}}</div>
						<div><img src="@assets/img/icon/next_black.png" alt=""></div>
					</router-link>
				</div>
				<div class="bottom">
					<div>
						<router-link to="/order/all/1">
							<img src="../assets/img/icon/icon_user_1.png" alt="">
							<span>全部订单</span>
						</router-link>
					</div>
					<div>
						<router-link to="/order/all/2">
							<img src="../assets/img/icon/icon_user_2.png" alt="">
							<span>待付款</span>
						</router-link>

					</div>
					<div>
						<router-link to="/order/all/3">
							<img src="../assets/img/icon/icon_user_3.png" alt="">
							<span>待收货</span>
						</router-link>

					</div>
					<div>
						<router-link to="/order/all/4">
							<img src="../assets/img/icon/icon_user_4.png" alt="">
							<span>售后</span>
						</router-link>
					</div>
				</div>
			</div>
			<menuBarBox :menuData="menuBarData.menu1"/>
			<menuBarBox :menuData="menuBarData.menu2"/>
			<menuBarBox :menuData="menuBarData.menu3"/>
			<div></div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import menuBarBox from '../components/user/menu_bar_box';
        import BScroll from 'better-scroll';

        export default {
                components: {menuBarBox},
                data(){
                        return {}
                },
                computed: {
                        menuBarData(){
                                return {
                                        menu1: [
                                                {title: '地址管理', url: 'site'},
                                                {title: '我的优惠券', url: '#'},
                                                {title: '优先购买码', url: '#'},
                                                {title: '提货兑换卡', url: '#'},
                                        ],
                                        menu2: [
                                                {title: '常见问题', url: '#'},
                                                {title: '服务支持', url: '#'}
                                        ],
                                        menu3: [
                                                {title: '意外碎屏保险', url: '#'},
                                                {title: '延长保修服务', url: '#'}
                                        ]
                                }
                        },
                        allOrder(){
                                this.$router.replace('/order/all')
                        },
                },
                watch: {},
                methods: {
                        _setCartNavBtnState(){
                                this.$store.commit('template/changeBtnState', {btn: ['Text',], NavTextContent: '个人中心'});
                        },
                        _initUserContentBScroll(){
                                this.UserContentBScroll = new BScroll(this.$refs.userContent, {
                                        click: true,
                                });
                        },
                },
                activated(){
                        this._setCartNavBtnState();
                        this._initUserContentBScroll();
                        this.$store.dispatch('isLogin');
                },
                mounted(){

                },
                deactivated(){
                        this.UserContentBScroll.destroy();
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.content
		padding 0 0.3rem 0.3rem

		.top-placeholder
			height 0.3rem

		.userState
			margin 0 0 0.3rem
			width 100%
			border-radius 0.2rem
			box-shadow 0 1px 2px rgba(0, 0, 0, .1), 0 18px 20px -10px rgba(0, 0, 0, .03), 0 18px 20px -10px rgba(0, 0, 0, .03), 0 10px 20px -10px rgba(0, 0, 0, .03)
			background #fff

			.top > a
				display flex
				align-items center
				padding 0.3rem
				border-bottom 0.01rem solid rgba(100, 100, 100, 0.2)

				div:first-child
					width 1.2rem
					height 1.2rem
					flex-shrink 0
					border-radius 50%
					overflow hidden
					margin-right 0.2rem

					img
						width 100%

				div:nth-child(2)
					flex-grow 1
					font-size 0.35rem
					font-weight 500
					color #333333

				div:last-child
					width 0.2rem
					flex-shrink 0

					img
						width 100%

			.bottom
				display flex

				div
					flex-grow 1
					border-right 0.01rem solid rgba(100, 100, 100, 0.1)

					a
						padding 0.3rem
						display flex
						flex-direction column
						align-items center

						img
							width 0.4rem
							height 0.4rem
							margin-bottom 0.2rem

						span
							color rgb(102, 102, 102)
							font-size 0.22rem

				div:last-child
					border-right 0
</style>