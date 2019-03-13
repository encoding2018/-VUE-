<template>
	<div class="content">
		<div class="floor1">
			<div class="msgBar">
				<div><img src="@assets/img/icon/icon_user_avatar.png" alt=""></div>
				<div>{{$store.state.username}}</div>
				<div><img src="@assets/img/icon/icon_edit.png" alt=""></div>
			</div>
			<div  class="bar">
				<router-link to="/">
					<div>手机</div>
					<div>{{$store.state.username}}</div>
					<div><img src="@assets/img/icon/next_black.png" alt=""></div>
				</router-link>
			</div>
			<div  class="bar">
				<router-link to="/">
					<div>邮箱</div>
					<div>未关联</div>
					<div><img src="@assets/img/icon/next_black.png" alt=""></div>
				</router-link>
			</div>
		</div>
		<div class="floor2">
			<menuBarBox :menuData="menuBarData.menu1"/>
		</div>
		<div>
			<btnBox title="退出登录" color="red" :state="true" :fn="logOut" size="big"/>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import menuBarBox from '../components/user/menu_bar_box';
        import btnBox from '../components/public/button';
        import api from '../utils/api';
        export default {
                components:{menuBarBox,btnBox},
                data(){
                        return{
                                username:''
                        }
                },
	        computed:{
                        menuBarData(){
                                return {
                                        menu1: [
                                                {title: '修改密码', url: 'user/change'},
                                        ],
                                }
                        }
	        },
	        methods:{
                        _setCartNavBtnState(){
                                this.$store.commit('template/changeBtnState', {btn: ['Text','Back'], NavTextContent: '账户详情'});
                        },
                        _setFooterMenuState(payload){
                                this.$store.commit('template/changeFooterMenu', payload);
                        },
                        logOut(){ //退出登录
                                this.$store.commit('openAllInit');                                      //打开所有初始化开关
                                this.$http.post(api.user.LOGOUT)
	                                .then(result=>{
	                                        if(result.ok){
	                                                this.$cookie.set('user','false');
	                                                this.$cookie.set('username','');
	                                                this.$store.commit('_changeLoginState',false);
	                                                this.$router.replace({path:'/user'});
	                                        }
	                                });
                        }
	        },
	        activated(){
                        this._setCartNavBtnState();
                        this._setFooterMenuState();
	        },
	        mounted(){

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
		background rgb(228, 228, 228)
		padding 0.3rem
		.floor1
			margin 0.3rem 0
			background #fff
			border-radius 0.2rem
			box-shadow 0 1px 2px rgba(0, 0, 0, .1), 0 18px 20px -10px rgba(0, 0, 0, .03), 0 18px 20px -10px rgba(0, 0, 0, .03), 0 10px 20px -10px rgba(0, 0, 0, .03)
			.bar
				border-bottom 0.01rem solid rgba(100,100,100,0.1)
				padding 0.4rem  0.3rem
				a
					display flex
					align-items center
					div:first-child
						flex-grow 1
						font-size 0.35rem
						color #333
					div:nth-child(2)
						color rgb(150, 150, 150)
						font-size 0.27rem
						margin-right 0.2rem
					div:last-child
						width 0.15rem
						img
							width 100%
			.msgBar
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
					width 0.4rem
					flex-shrink 0

					img
						width 100%
</style>