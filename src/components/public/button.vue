<template>
	<div  :class="`button ${color?color:'blue'} ${size?size:''} ${state?'':`buttonDeActive${color?color:'blue'}`}` "
	      @click="fn()">
		<span>{{title}}</span>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: ['title', 'fn', 'color', 'size', 'state']
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.button
		width 100%
		border-radius 0.1rem
		display flex
		justify-content center
		align-items center

		span
			color #fff
			font-weight 700
			font-size 0.3rem

	.white
		background linear-gradient(#fff, #fcfcfc)
		border 0.01rem solid rgba(100, 100, 100, 0.2)

		span
			color rgb(140, 140, 140)

	.blue
		background linear-gradient(rgb(110, 152, 244), rgb(75, 119, 238))

		span
			color #fff
	.red
		background linear-gradient(#db6962, #d0453d)
		span
			color #fff

	.big
		padding 0.3rem

	.buttonDeActiveblue
		background linear-gradient(rgba(111, 148, 232, 0.5), rgba(81, 120, 223, 0.5))
	.buttonDeActivered
		background linear-gradient(#db696275, #d0453d85)

</style>