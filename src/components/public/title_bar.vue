<template>
	<div class="title">
		<router-link :to="titleData.cid ? `index/floor/${titleData.cid}` : '' " v-if="titleData">
			<p v-text="titleData.title" class="titleText c127f32w7"></p>
			<p v-if="productNum" class="productText">
				<span>总计</span>
				<span>{{productNum}}</span>
				<span>件商品</span>
			</p>
		</router-link>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props:['titleData','productNum']
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.title
		padding 0.2rem
		border-bottom 0.01rem solid rgba(0, 0, 0, 0.1)
		a
			display flex
			align-items center
			.titleText
				flex-grow 1
			.productText
				font-size 0.24rem
				color #7f7f7f
</style>