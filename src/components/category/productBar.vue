<template>
	<div class="bar">
		<div class="imgBox"><div :style="`background-image: url(${data.avatar})`"></div></div>
		<div class="nameBox">{{data.name}}</div>
		<div class="btnBox"><img src="@assets/img/icon/next_black.png" alt=""></div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: ['data']
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.bar
		display flex
		width 100%
		align-items center
		.imgBox
			width 0.8rem
			flex-shrink 0
			margin-right  0.1rem
			div
				width 100%
				padding-top 100%
				background-size 100%

		.nameBox
			color rgba(0, 0, 0, 0.8)
			flex-grow 1
			padding 0 0.1rem
			font-size 0.26rem
			font-weight 700
			white-space nowrap
			overflow hidden
			text-overflow ellipsis

		.btnBox
			flex-shrink 0
			width 0.13rem

			img
				width 100%

</style>