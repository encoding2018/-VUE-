<template>
	<transition name="fade">
		<div class="alert" v-if="alertState">{{alertMessage}}</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import {createNamespacedHelpers} from 'vuex';
	const {mapState} =createNamespacedHelpers('template');
        export default {
                data(){
                        return{

                        }
                },
	        computed:{
                        ...mapState(['alertState','alertMessage'])
	        },
	        methods:{

	        },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
	}

		.alert
			position fixed
			left 50%
			bottom 1.5rem
			padding 0.2rem 0.3rem
			border-radius 0.1rem
			color rgb(153,107,61)
			border 0.02rem solid rgb(223,198,169)
			transform translateX(-50%)
			display inline-block
			background-color rgb(251,239,209)


</style>