<template>
	<ul class="barBox">
		<li v-for="(item,i) in menuData" class="bar">
			<router-link :to="`/${item.url}`">
				<div v-text="item.title"></div>
				<div><img src="@assets/img/icon/next_black.png" alt=""></div>
			</router-link>
		</li>
	</ul>
</template>

<script type="text/ecmascript-6">

        export default {
                props: ['menuData'],
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.barBox
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
				div:last-child
					width 0.15rem
					img
						width 100%
</style>