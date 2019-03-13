<template>
	<div class="content product-category" ref="productCategoryContent">
		<div class="p-box" v-if="allData">
			<Title :titleData="{title}" v-if="$route.name ==='indexFloor'"/>
			<div class="content" ref="">
				<productBox :data='allData.data' :scrollState="initBScroll"/>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import imagesLoaded from 'imagesloaded';
        import BScroll from 'better-scroll';
        import {createNamespacedHelpers} from 'vuex';

        import Title from '../components/public/title_bar';
        import productBox from '../components/public/product_box';

        const {mapState, mapActions} = createNamespacedHelpers('home');
        const categoryMapState = createNamespacedHelpers('category');

        export default {
                name: 'categoryList',
                components: {Title, productBox},
                data(){
                        return {
                                isDataState: false,
                                cid: parseInt(this.$route.params.id),
	                        isInit:false
                        }
                },
                computed: {
                        ...mapState(['product']),
                        ...categoryMapState.mapState(['categoryData']),
                        allData(){ // 计算当前页面的数据
                                let cid = this.cid;
                                return this.$route.name === 'indexFloor'? // 判断页面
                                        this.product.find(item => item.cid === cid)
                                        :this.categoryData.find(item => item.cid === cid);
                        },
                        title(){
                                if(this.allData) return this.allData.title;
                        }
                },
                watch: {
                        allData(){

                        }
                },
                methods: {
                        ...mapActions({ //home 仓库映射
                                init: 'init',
                                indexUpdate: 'update'
                        }),
                        ...categoryMapState.mapActions({ //category 仓库映射
                                categoryUpdate: 'update'
                        }),
                        _setIndexNavBtnState(){ //设置nav按钮 状态
                                this.$store.commit('template/changeBtnState', {btn: ['Back', 'Text'], NavTextContent: this.title});
                        },
                        _initProductCategoryBScroll(dom){
                                imagesLoaded(dom||this.$refs.productCategoryContent, () => { //初始化better-scroll
                                        this.productCategoryBScroll = new BScroll(this.$refs.productCategoryContent, {click: true,bounce: false});
                                })
                        },
                        _getProductData(){
                                if(this.$route.name === 'indexFloor'){
                                        this.indexUpdate(this.cid)
                                                .then(() => {
                                                        initFn();
                                                });
                                }else{
                                        this.categoryUpdate(this.cid)
                                                .then(() => {
                                                        initFn();
                                                });
                                }
                                const initFn = () => { //数据请求完成后执行页面初始化
                                        this.isShow = true;
                                        this._setIndexNavBtnState();
                                }
                        },
                        initBScroll(dom){ //子组件加载完成
                                this._initProductCategoryBScroll(dom);
                                this._setIndexNavBtnState();
                                this.isInit = true;
                        }
                },
                activated(){
                        this.cid = parseInt(this.$route.params.id); // 每次激活更改 cid
                        if(!this.allData){this._getProductData();return} // 如果仓库中没有数据则去服务器请求
                        this._setIndexNavBtnState();                            // 设置nav按钮状态
                        if(this.isInit) this._initProductCategoryBScroll();
                },
                mounted(){

                },
                updated(){

                },
                deactivated(){
                        this.productCategoryBScroll.destroy();
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>