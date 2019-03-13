<template>
	<div class="content index bgColor-228" ref="content">
		<div class="content-wrapper">
			<div class="banner">
				<div class="banner-picture bgColor-255" ref="banner" v-show="bannerBScrollConfig.isShow">
					<ul ref="bannerChildren">
						<li v-for="item in banner" :key="item.id">
							<router-link :to="item.url">
								<div :style="`background-image: url(${item.avatar})`"></div>
							</router-link>
						</li>
					</ul>
					<ul>
						<li v-for="i in banner.length" :key="i"
						    :class="bannerBScrollConfig.index+1===i?'active':''"></li>
					</ul>
				</div>
				<div class="banner-menu bgColor-255" v-if="bannerMenu">
					<ul>
						<li v-for=" (item,i) in bannerMenu" :key="i">
							<router-link :to="item.url">
								<div :style="`background-image: url(${item.avatar})`"></div>
								<span v-text="item.name" class="c127f24"></span>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<floor :data="this.product[0]" :template="1" :showNumber="6"/>
			<poster :data="posterTop" :template="1" :showNumber="6"/>
			<floor :data="this.product[1]" :template="2" :showNumber="6"/>
			<floor :data="this.product[2]" :template="1" :showNumber="6"/>
			<floor :data="this.product[3]" :template="2" :showNumber="6"/>
			<floor :data="this.product[4]" :template="2" :showNumber="6"/>
			<floor :data="this.product[5]" :template="3" :showNumber="5"/>
			<floor :data="this.product[6]" :template="2" :showNumber="6"/>
			<poster :data="posterBottom" :template="2" v-if="productState.ShowId>=8"/>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import BScroll from 'better-scroll';
        import imagesLoaded from 'imagesloaded';

        import floor from '../components/index/floor';
        import poster from '../components/index/poster_template';
        import {createNamespacedHelpers} from 'vuex';

        const {mapState, mapActions} = createNamespacedHelpers('home');
        export default {
                name: 'index',
                components: {floor, poster},
                data(){
                        return {
                                contentBScrollConfig: {
                                        mouseWheel: true
                                },
                                bannerBScrollConfig: {
                                        index: 0,
                                        loop: true,
                                        speed: 500,
                                        isShow: false
                                },
                                productState: {
                                        ShowId: 2,
                                },
                                updateState: true,
                                showState: {
                                        bannerMenu: false
                                },
                        }
                },
                watch: {},
                computed: {
                        ...mapState(['product', 'banner', 'bannerMenu', 'poster']),
                        posterTop(){
                                return this.poster.top
                        },
                        posterBottom(){
                                return this.poster.bottom
                        },
                },
                methods: {
                        ...mapActions(['init', 'update']),
                        _setIndexNavBtnState(){ // 设置nav状态
                                this.$store.commit('template/changeBtnState', {btn: ['Menu', 'Logo', 'Search']});
                        },
                        _initContentBScroll(){
                                if(this.contentBScroll) return; // 初始化后直接 return 否则进行初始化
                                this.contentBScroll = new BScroll(this.$refs.content, {
                                        mouseWheel: this.contentBScrollConfig.mouseWheel,
                                        click: true,
                                        bounce: false,
                                        pullUpLoad: {
                                                threshold: 50
                                        }
                                });
                                this.contentBScroll.on('pullingUp', () => { //上拉更新数据
                                        this._indexUpdate();

                                });
                        },
                        _initBannerBScroll(){ // 初始化banner better-scroll
                                if(this.BannerBScroll) return;
                                this.bannerBScrollConfig.isInit = true;
                                imagesLoaded(this.$refs.bannerChildren, () => {
                                        this.bannerBScrollConfig.isShow = true;
                                        this.$refs.bannerChildren.style.width = this.banner.length + 2 + '00%';
                                        this.BannerBScroll = new BScroll(this.$refs.banner, {
                                                scrollX: true,
                                                scrollY: false,
                                                momentum: false,
                                                click: true,
                                                snap: {
                                                        loop: this.bannerBScrollConfig.loop,
                                                        threshold: 0.2,
                                                        speed: this.bannerBScrollConfig.speed,
                                                }
                                        });
                                        this.BannerBScroll.on('scrollEnd', () => {
                                                this.bannerBScrollConfig.index = this.BannerBScroll.getCurrentPage().pageX;
                                        });
                                });
                        },
                        _indexUpdate(){ //更新数据
                                if(!this.updateState) return; //是否更新完成
                                if(this.productState.ShowId >= 8) return; //数据是否全部加载完成
                                this.updateState = false;
                                this.update(this.productState.ShowId)
                                        .then(() => {
                                                this.updateState = true; //重置更新状态
                                                this.contentBScroll.refresh();
                                                this.productState.ShowId++;
                                                this.contentBScroll.finishPullUp();
                                        });
                        }

                },
                activated(){
                        this.init();                               //初始化主页数据
                        this._setIndexNavBtnState();  //设置nav按钮状态
                },
                mounted(){

                },
                updated(){
                        this._initContentBScroll();      //
                        this._initBannerBScroll();       //初始化bannerBScroll
                },
                destroyed(){

                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.content.index
		.banner
			.banner-picture
				overflow hidden
				position relative

				& > ul:first-child
					display flex

					li
						flex-grow 1
						padding 0.2rem
						width 100%

						a
							display inline-block
							width 100%

							div
								width 100%
								padding-top 42%
								background-size 100%
								background-repeat no-repeat
								background-position center

				& > ul:last-child
					position absolute
					width 100%
					text-align center
					bottom 0.4rem

					li
						display inline-block
						height 0.12rem
						width 0.12rem
						background-color rgba(0, 0, 0, 0.1)
						border-radius 100%
						margin 0 0.05rem
						box-shadow 0 0 5px 2px rgba(0, 0, 0, 0.1)

					.active
						background-color rgba(255, 255, 255, 1)

			.banner-menu
				padding-bottom 0.2rem

				ul
					display flex
					padding 0.2rem
					justify-content space-between

					li
						flex 1 0 0

						a
							display flex
							flex-direction column
							align-items center

							div
								width 100%
								padding-top 60%
								background-size 35%
								background-repeat no-repeat
								background-position center

</style>