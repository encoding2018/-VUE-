<template>
	<div class="wrapper">
		<div class="header">
			<NavMenu/>
		</div>
		<keep-alive exclued="login">
			<router-view/>
		</keep-alive>
		<div class="footer" v-if="this.$store.state.template.footerMenu">
			<FooterMenu/>
		</div>
		<div class="alert" v-if="this.$store.state.template.alertState">
			<Alert/>
		</div>
	</div>
</template>

<script>
        import Index from './views/index';
        import NavMenu from './components/nav/header_menu';
        import FooterMenu from './components/nav/footer_menu';
        import Alert from './components/public/alert';

        export default {
                name: 'App',
                components: {Index, NavMenu, FooterMenu,Alert},
        }
</script>

<style lang="stylus" rel="stylesheet/stylus">
	/*主体布局*/
	.wrapper
		display flex

		.header
			flex-shrink 0
			height 1rem

		.content
			flex-grow 1
			overflow hidden

			&  .content-wrapper > div
				margin-bottom 0.2rem

		.footer
			flex-shrink 0
			height 1rem
		.alert
			position fixed
			bottom 0
</style>
