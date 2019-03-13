<template>
	<ul class="footer-menu-box"  v-if="footerMenu">
		<li v-for="(v,i) in MenuData" :key="i" @click="_getCurPath()" class="footer-menu-btn">
			<router-link :to="v.url" exact :class="_setActiveClass(i)?'router-link-active':''">
				<img v-show="curPath !== v.url" :class="`img${i+1}`" alt="" src=""/>
				<img v-show="curPath === v.url" :class="`activeImg${i+1}`" alt="" src=""/>
				<span class="c-154">{{v.name}}</span>
			</router-link>
		</li>
	</ul>
</template>

<script type="text/ecmascript-6">
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('template');
        export default {
                data(){
                        return {
                                MenuData: [
                                        {name: '首页', url: '/'},
                                        {name: '分类', url: '/category'},
                                        {name: '购物车', url: '/cart'},
                                        {name: '个人中心', url: '/user'}
                                ],
                                curPath: '',
	                        isPage:false
                        }
                },
                computed: {
                        ...mapState(['footerMenu']),
                },
                watch: {

                },
                methods: {
                        _getCurPath(){
                                this.curPath = this.$router.history.current.path;
                        },
                        _setActiveClass(id){
                                return id === 0 && this.$route.name === 'indexFloor' ||
                                        id === 1 && this.$route.name === 'categoryFloor';
                        },
                },
                created(){
                        this._getCurPath();
                },
	        updated(){
                        this._getCurPath();
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.footer-menu-box
		display flex
		height 100%

		.footer-menu-btn
			flex-grow 1
			height 100%

			a
				width 100%
				height 100%
				display flex
				flex-direction column
				align-items center
				justify-content center

				img
					width 0.5rem

				.img1
					content: url('../../assets/img/footerMenu/footerMenu-1.png');

				.img2
					content: url('../../assets/img/footerMenu/footerMenu-2.png');

				.img3
					content: url('../../assets/img/footerMenu/footerMenu-3.png');

				.img4
					content: url('../../assets/img/footerMenu/footerMenu-4.png');

				.activeImg1
					content: url('../../assets/img/footerMenu/footerMenu-1-active.png');

				.activeImg2
					content: url('../../assets/img/footerMenu/footerMenu-2-active.png');

				.activeImg3
					content: url('../../assets/img/footerMenu/footerMenu-3-active.png');

				.activeImg4
					content: url('../../assets/img/footerMenu/footerMenu-4-active.png');

				span
					font-size 0.18rem
					font-weight 700

			.router-link-active
				box-shadow inset 0 0 20px 5px rgba(0, 0, 0, .1)

			.router-link-active > span
				color rgb(102, 102, 102)
</style>