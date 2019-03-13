<template>
	<ul class="content" ref="PBoxCentent">
		<li v-for="(item,i) in data" :key="i">
			<router-link :to='`/product/${item.id}`'>
				<div class="img-box">
					<div :style="`background-image: url(${item.avatar})`"></div>
				</div>
				<div class="text-box">
					<messageBox :textData="{name:item.name,avatar:item.avatar,title:item.title,price:item.price,style:item.style}"/>
				</div>
			</router-link>
		</li>
	</ul>
</template>

<script type="text/ecmascript-6">
        import messageBox from './product_message';

        export default {
                components: {messageBox,},
                props: ['data','scrollState'],
	        mounted(){
                        if(this.scrollState) this.scrollState(this.$refs.PBoxCentent);
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.content
		li
			padding 0.1rem 0.1rem 0.1rem 0.3rem
			border-bottom 0.01rem solid rgba(0, 0, 0, 0.1)

			a
				display flex
				justify-content space-between

				.img-box
					width 35%
					text-align center

					div
						width 100%
						padding-top 100%
						background-position center
						background-repeat no-repeat
						background-size 100%


				.text-box
					width 55%
					display flex
					align-items center
</style>