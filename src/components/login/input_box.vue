<template>
	<div class="inputContent">
		<input v-for="(item,i) in inputData" :key="i"
		       :value="item.value ? `+86  ${item.value}` : '' "
		       :readonly="item.value"
		       :placeholder="item.placeholder"
		       :type="item.type ? item.type:'text' "
		       @input="inputFn(item.placeholder,$event)">
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: ['inputData','inputFn','value']
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.inputContent
		display flex
		flex-direction column
		border 0.01rem solid rgba(0,0,0,0.1)
		border-radius 0.15rem
		overflow hidden
		input
			border 0
			padding 0.3rem
			font-size 0.32rem
			outline none
			border-bottom 0.01rem solid rgba(0,0,0,0.1)
		input::-webkit-input-placeholder
			color rgb(192,192,192)
</style>