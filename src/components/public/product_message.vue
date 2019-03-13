<template>
	<div class="titleBox" :class="isProduct?'product':'default'">
		<div class="name textEllipsis" v-if="textData.name" v-text="textData.name"></div>
		<div :class="`title ${!isProduct?'textEllipsis':''}`" v-if="textData.title"  v-text="textData.title"></div>
		<div class="type" v-if="textData.type||textData.style"  v-text="textData.type||textData.style"></div>
		<div class="price textEllipsis" v-if="textData.price" >
			<span>¥</span>
			<span v-text="`${textData.price}.00`"></span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: ['textData','isProduct'],
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.textEllipsis
		overflow hidden
		text-overflow ellipsis
		white-space nowrap

	.titleBox
		width 100%

		& > *
			margin-bottom 0.15rem

		.name
			font-weight 700
			color rgb(51, 51, 51)

		.title
			color rgb(127, 127, 127)

		.price
			& > *
				color rgb(212, 77, 68)
				font-weight 700
		.type
			color #3965cc
			font-size 0.16rem
			background #e5efff
			display inline-block
			padding 0.02rem 0.05rem
			border-radius 0.06rem
			border 0.01rem solid rgb(148,179,247)
	.default
		.name
			font-size 0.26rem
		.title
			font-size 0.2rem
		.price
			span:first-child
				font-size 0.2rem

			span:last-child
				font-size 0.26rem
	.product
		.name
			font-size 0.32rem
		.title
			font-size 0.26rem
		.price
			span:first-child
				font-size 0.3rem

			span:last-child
				font-size 0.3rem
</style>