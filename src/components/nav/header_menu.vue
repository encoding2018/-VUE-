<template>
	<ul class="nav-menu-box">
		<li class="nav-menu-btnBox left">
			<div v-if="BtnState.Back" class="nav-back-btn" @click="routerBack">
				<div>
					<div>
						<img src="@assets/img/icon/prev_white.png" alt="">
					</div>
					<div>返回</div>
				</div>
			</div>
			<div v-if="BtnState.Menu" class="nav-menu-btn"></div>
		</li>
		<li class="nav-textBox center">
			<div v-if="BtnState.Text" class="nav-text" v-text="BtnState.Text"></div>
			<div v-if="BtnState.Logo" class="nav-logo"></div>
		</li>
		<li class="nav-menu-btnBox right">
			<div v-if="BtnState.Edit" class="nav-edit-btn">
				<div @click="changeEdit">
					<span>{{$store.state.cart.isEdit ? '完成': '编辑'}}</span>
				</div>
			</div>
			<div v-if="BtnState.Search" class="nav-search-btn"></div>
		</li>
	</ul>
</template>

<script type="text/ecmascript-6">
        export default {
                data(){
                        return {
                                BtnState: this.$store.state.template.BtnState,
                                EditText: '编辑'
                        }
                },
                methods: {
                        routerBack(){
                                this.$router.back(-1);
                        },
                        changeEdit(){
                                this.$store.commit('cart/changeEditState');
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	/*主体布局*/
	.nav-menu-box
		height 100%
		display flex
		background #000000
		background-image linear-gradient(#1d1d1d, #181818)

		& > *
			height 100%

		.nav-textBox
			flex-grow 1

		.nav-menu-btnBox
			flex-shrink 0
			width 1rem

		& > li > div
			height 100%
			background-repeat no-repeat
			background-size 1rem
			background-position top center

	.nav-menu-btnBox.left > .nav-menu-btn
		background-image url("../../assets/img/icon/nav-menu.png");

	.nav-menu-btnBox.left > .nav-back-btn
		background null
		display flex
		justify-content center
		align-items center

		& > div
			height 50%
			width 80%
			display flex
			align-items center
			justify-content space-between
			background linear-gradient(#2a2a29, #151515)
			box-shadow inset 0 1px 1px hsla(0, 0%, 100%, .1), inset 0 0 1px rgba(0, 0, 0, .5)
			padding 0.1rem 0.05rem

			div:first-child
				width 0.12rem
				height 100%
				display flex
				align-items center

				img
					width 100%

			div:last-child
				color #fff
				height 100%
				white-space nowrap


	.nav-textBox.center > .nav-logo
		background-image url("../../assets/img/icon/nav-logo.png")

	.nav-menu-btnBox.right > .nav-search-btn
		background-image url("../../assets/img/icon/nav-search.png");
		background-size 45%
		background-position center

	.nav-menu-btnBox.right > .nav-edit-btn
		background null
		display flex
		justify-content center
		align-items center

		& > div
			height 50%
			width 80%
			background linear-gradient(#2a2a29, #151515)
			box-shadow inset 0 1px 1px hsla(0, 0%, 100%, .1), inset 0 0 1px rgba(0, 0, 0, .5)
			padding 0.1rem 0.05rem
			text-align center
			color #fff

	.nav-textBox.center > .nav-text
		font-size 0.36rem
		font-weight 700
		color rgb(255, 255, 255)
		text-align center
		line-height 1rem

</style>