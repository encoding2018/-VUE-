<template>
	<div :class="`poster-${template===1?'top':'bottom'}`" v-if="data">
		<div class="left">
			<div v-for="(item,i) in data.filter(item =>item.location===1)" :key="i">
				<router-link :to="`product/${item.pid}`">
					<img :src="item.avatar" alt="">
				</router-link>
			</div>
		</div>
		<div class="right">
			<div v-for="(item,i) in data.filter(item =>item.location===2)" :key="i">
				<router-link :to="`product/${item.pid}`">
					<img :src="item.avatar" alt="">
				</router-link>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props:['data','template'],
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.poster-top
		display flex
		padding 0.2rem
		background #fff

		& > div
			flex-grow 1

			a
				display inline-block
				height 100%
				width 100%

				img
					width 100%
					height 100%

		.left
			display flex
			flex-direction column
			justify-content space-between
			margin-right 0.1rem
		.right
			margin-left 0.1rem

			div
				overflow hidden
				border-radius 0.2rem
				border 0.01rem solid rgba(0, 0, 0, 0.2)
	.poster-bottom
		display flex
		justify-content space-between
		padding 0.2rem
		background #fff

		& > div
			width 48.5%

			& > div
				margin-bottom 0.1rem

				a
					display inline-block
					width 100%

					img
						width 100%
</style>