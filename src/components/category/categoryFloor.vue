<template>
	<div class="content" v-if="data">
		<titleBar :titleData="{title:data.title}"/>
		<div class="avatar">
			<router-link :to="`/category/list/${cid}`">
				<div :style="`background-image: url(${data.avatar})`"></div>
			</router-link>
		</div>
		<div class="product">
			<ul :class="template === 2 ? 'w50':'w100' " v-if="template<=2">
				<li v-for="(v,i) in data.data.slice(0,quantity)" :key="i">
					<router-link :to="`/product/${v.id}`">
						<productBar :data="v"/>
					</router-link>
				</li>
			</ul>
			<ul v-if="template===3" class="template3">
				<li v-for="(v,i) in data.data.slice(0,quantity)" :key="i">
					<router-link :to="`/product/${v.id}`">
						<div class="imgBox" :style="`background-image: url('${v.avatar}')`"></div>
						<div class="nameBox">{{v.name}}</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import titleBar from '../public/title_bar';
        import productBar from '../category/productBar';

        export default {
                components: {titleBar, productBar},
                props: ['data', 'quantity', 'template', 'cid']
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.content
		background #fff

		.avatar
			padding 0.3rem 0.2rem

			div
				width 100%
				padding-top 25%
				background-position center
				background-repeat no-repeat
				background-size 100%
				border-radius 0.15rem
				box-shadow 0 10px 20px 2px rgba(100, 100, 100, 0.2)


		.w50
			display flex
			flex-wrap wrap

			li
				border-top 0.01rem solid rgba(0, 0, 0, 0.1)
				width 50%
				padding 0.2rem

		.w100 > li
			width 100%
			padding 0.2rem
			border-top 0.01rem solid rgba(0, 0, 0, 0.1)

		.template3
			display flex
			flex-wrap wrap
			justify-content space-between
			padding 0.2rem

			li
				width 31.5%
				margin-bottom 0.2rem

				.imgBox
					width 100%
					padding-top 100%
					border-radius 0.15rem
					overflow hidden
					border 0.01rem solid rgba(0, 0, 0, 0.1)
					background-position center
					background-size 65%
					background-repeat no-repeat

				.nameBox
					text-align center
					color rgba(0, 0, 0, 0.8)
					font-size 0.2rem
					padding 0.1rem 0
					font-weight bold
					white-space nowrap
					overflow hidden
					text-overflow ellipsis

</style>