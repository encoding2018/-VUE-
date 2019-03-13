<template>
	<div v-if="data" class="wrapper">
		<titleBar :titleData="{title,cid}"/>
		<div :class="`content${template}`" ref="ICT1content" v-if="template===1">
			<productBox :data="productData" :template="template"/>
		</div>
		<productBox :data="productData" :template="template" v-if="template===2"/>
		<productBox :data="productData" :template="template" v-if="template === 3"/>
	</div>
</template>

<script type="text/ecmascript-6">
	import titleBar from '../public/title_bar';
        import productList from '../public/product_box';
	import productBox from '../index/product_box';

	import BScroll from 'better-scroll';
	import imagesLoaded from 'imagesloaded';

        export default {
                components:{titleBar,productBox,productList},
                props:['data','template','showNumber'],
	        data(){
                          return {
                                  imagesLoaded: undefined,
                                  BScroll: undefined,
                          }
	        },
	        computed:{
                        title(){
                                return this.data.title;
                        },
                        cid(){
                                return this.data.cid;
                        },
		        productData(){
                                return this.data.data.slice(0,this.showNumber)
		        }
	        },
	        methods:{
                        _initBScroll(){
                                if(this.template !== 1) return;
                                let timer = setInterval(() => {
                                        let temp = false;
                                        if(this.$refs.ICT1content){
                                                temp = true;
                                                clearInterval(timer);
                                                if(!temp) return;
                                                this.imagesLoaded = imagesLoaded(this.$refs.ICT1content, () => {
                                                        let dom = this.$refs.ICT1content.children[0];
                                                        let domWidth = dom.children[0].clientWidth;
                                                        dom.style.width = `${domWidth * 6}px`;
                                                        this.BScroll = new BScroll(this.$refs.ICT1content, {
                                                                scrollX: true,
                                                                scrollY: false,
                                                                click: true,
                                                        });
                                                });
                                        }
                                }, 100);
                        }
	        },
	        mounted(){
                        this._initBScroll();
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.wrapper
		background #fff

		.content1
			font-size 0.2rem
			padding 0.2rem 0 0 0


</style>