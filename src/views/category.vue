<template>
	<div class="content category bgColor-228" ref="categoryContent" v-show="categoryData">
		<div class="subContent">
			<floor :data="this.categoryData[0]" :quantity="2" :template="1" :cid="1"/>
			<floor :data="this.categoryData[1]" :quantity="4" :template="2" :cid="2"/>
			<floor :data="this.categoryData[2]" :quantity="9" :template="3" :cid="3"/>
			<floor :data="this.categoryData[3]" :quantity="6" :template="3" :cid="4"/>
			<floor :data="this.categoryData[4]" :quantity="6" :template="2" :cid="5"/>
			<floor :data="this.categoryData[5]" :quantity="2" :template="2" :cid="6"/>
			<floor :data="this.categoryData[6]" :quantity="6" :template="2" :cid="7"/>
			<floor :data="this.categoryData[7]" :quantity="2" :template="2" :cid="8"/>
			<floor :data="this.categoryData[8]" :quantity="9" :template="3" :cid="9"/>
			<floor :data="this.categoryData[9]" :quantity="4" :template="2" :cid="10"/>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import imagesloaded from 'imagesloaded';
        import BScroll from 'better-scroll';

        import navMenu from '../components/nav/header_menu';
        import footerMenu from '../components/nav/footer_menu'
        import floor from '../components/category/categoryFloor';

        import {createNamespacedHelpers} from 'vuex';

        const {mapActions, mapState} = createNamespacedHelpers('category');

        export default {
                name: 'category',
                components: {navMenu, footerMenu, floor},
                data(){
                        return {
                                curShowId: 3
                        }
                },
                computed: {
                        ...mapState(['categoryData']),
                },
                watch: {},
                methods: {
                        ...mapActions(['init', 'update']),
                        _setCategoryNavBtnState(){ //设置nav状态
                                this.$store.commit('template/changeBtnState', {
                                        btn: ['Menu', 'Text', 'Search'],
                                        NavTextContent: '分类'
                                });
                        },
                        _initCategoryBScroll(){ //初始化content better-scroll
                                if(this.categoryContentBscroll) return;
                                imagesloaded(this.$refs.categoryContent, () => {
                                        this.categoryContentBscroll = new BScroll(this.$refs.categoryContent, {
                                                click: true,
                                                mouseWheel: true,
                                                bounce: false,
                                                pullUpLoad: {
                                                        threshold: 20
                                                }
                                        });
                                        this.categoryContentBscroll.on('pullingUp', () => {
                                                this._categoryUpDate();
                                        });
                                });
                        },
                        _categoryUpDate(){
                                if(this.curShowId >= 11) return;
                                this.update(this.curShowId+1);
                                this.categoryContentBscroll.finishPullUp();
                                this.curShowId++;
                        }
                },
                activated(){
                        this._setCategoryNavBtnState();
                        this.init(this.curShowId);
                },
                mounted(){

                },
                updated(){
                        this._initCategoryBScroll();
                        if(this.categoryContentBscroll) this.categoryContentBscroll.refresh();
                },
                deactivated(){

                }

        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.content.category
		.subContent > *
			margin-bottom 0.2rem

</style>