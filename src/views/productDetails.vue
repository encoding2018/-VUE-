<template>
	<div class="content" v-show="isShow">
		<div class="title-box">
			<div v-for="(v,i) in topMenu" :key="i" :class="i===0?'active':''">{{v}}</div>
		</div>
		<div ref="BScrollContent" class="subContent">
			<div ref="BScrollSubContent">
				<div class="img-box" :style="`background-image: url(${curProduct.avatar})`"></div>
				<div class="message-box">
					<titleBar :titleData="{title:'商品信息'}"/>
					<div class="message">
						<messageBox :textData="{name,title:subtitle || title,price:curProduct.price}" :isProduct="true"/>
					</div>
				</div>
				<div class="type-select" @click="changeTypeState()">
					<div class="title">已选版本</div>
					<div class="type-box">
						<div>
							<div v-if="curProduct.color">
								<span>颜色:</span><span>{{curProduct.color}}</span>
							</div>
							<div v-if="curProduct.type">
								<span>容量:</span><span>{{curProduct.type}}</span>
							</div>
							<div v-if="curProduct.size">
								<span>尺码:</span><span>{{curProduct.size}}</span>
							</div>
							<div v-if="curProduct.style">
								<span>款式:</span><span>{{curProduct.style}}</span>
							</div>
							<div v-if="curProduct.edition">
								<span>版本:</span><span>{{curProduct.edition}}</span>
							</div>
							<div>
								<span>数量:</span><span>{{selectNumber}}</span>
							</div>
						</div>
						<div>
							<img src="@assets/img/icon/next_black.png" alt="">
						</div>
					</div>
				</div>
				<div class="details">
					<titleBar :titleData="{title:'商品详情'}"/>
				</div>
			</div>
		</div>
		<div class="menu">
			<div class="icon">
				<router-link to="/cart"></router-link>
			</div>
			<div class="addCart">
				<TButton title="加入购物车" :fn="addCart" color="white" :state="true"/>
			</div>
			<div class="buy">
				<TButton title="现在购买" :fn="bay" color="blue" :state="true"/>
			</div>
		</div>
		<transition name="fade">
			<div class="changeTypeMenu" v-show="changeType.state">
				<div class="top">
					<div class="img-box"
					     :style="`background-image: url('${curProduct.avatar}')`"></div>
					<div class="msg-box">
						<messageBox :textData="{name,title,price:curProduct.price}"
						            :isProduct="true"/>
					</div>
				</div>
				<div class="typeMenuBox" ref="typeMenuBoxContent" v-if="typeArr">
					<div class="typeMenuBoxContent">
						<div class="typeClass" v-for="(item,i) in typeArr" :key="i">
							<div class="titleBox">
								<titleBar :titleData="{title:`选择${item.title}`}"/>
							</div>
							<div class="typeBox">
								<div :class="v === curProduct[item.type] ? 'active':''"
								     v-for="(v,i) in item.data" :key="i"
								     @click="changeTypeBtn($event,item.type)">
									{{v}}
								</div>
							</div>
						</div>
						<div class="typeClass">
							<div class="titleBox">
								<titleBar :titleData="{title:'选择数量'}"/>
							</div>
							<div class="countBtnBox">
								<input type="button" :disabled="selectNumber === 1" @click="selectNumber = selectNumber - 1"/>
								<div v-text="selectNumber"></div>
								<input type="button" :disabled="selectNumber === 3" @click="selectNumber = selectNumber + 1"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="mask-layer" v-show="changeType.state" @click="changeTypeState()"></div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
        import titleBar from '../components/public/title_bar';
        import messageBox from '../components/public/product_message';
        import TButton from '../components/public/button';
        import api from '../utils/api';
        import BScroll from 'better-scroll';

        import {createNamespacedHelpers} from 'vuex';

        const {mapActions, mapState} = createNamespacedHelpers('product');
        export default {
                name: 'product',
                components: {titleBar, messageBox, TButton},
                data(){
                        return {
                                topMenu: ['商品', '详情', '参数', '推荐'],
                                name: '',
                                title: '',
                                subtitle: '',
                                selectNumber: 1,
                                curProduct: {id: 0, pid: 0, avatar: '', price: 0, type: '', color: '', size: '', style: ''},
                                curParamsId: 0,
                                isShow: false,
                                changeType: {
                                        state: false
                                },
                                typeArr: undefined,
	                        curType:{color:'', type:'',size:''}
                        }
                },
                computed: {
                        ...mapState(['product']),
                },
                watch: {},
                methods: {
                        ...mapActions(['init']),
                        _productDataInit(){
                                let {curParamsId} = this;
                                this.init(curParamsId)
                                        .then(() => {
                                                let {name,title,subtitle,data} = this.product;
                                                this.curProduct = data.find(item => item.id === curParamsId);
                                                let {type,color,size} = this.curProduct;
                                                this.name = name;
                                                this.title = title;
                                                this.subtitle = subtitle;
                                                this.curType.type = type;
                                                this.curType.color = color;
                                                this.curType.size = size;
                                                this.typeArr = this._typeArr();
                                                this._setIndexNavBtnState();
                                                this._initBScroll();
                                        });
                        },
                        _typeArr(){
                                let data = this.product.data,
                                        temp = [],
                                        typeArr = [{type:'type',name:'版本'},{type:'color',name:'颜色'},{type:'style',name:'款式'}
                                        ,{type:'size',name:'尺寸'},{type:'edition',name:'版本'}];
                                for(let i = 0;i<typeArr.length;i++){
                                        let state = true,tempObj = {},tempData=[];
                                        for(let j =0;j<data.length;j++){
                                                let curType = data[j][typeArr[i].type];
                                                if(curType===null){state=false;break}
                                                tempObj.title = typeArr[i].name;
                                                tempObj.type = typeArr[i].type;
                                                if(tempData.indexOf(curType)===-1) tempData.push(curType);
                                        }
                                        tempObj.data = tempData;
                                        if(state) temp.push(tempObj);
                                }
                                return temp;
                        },
                        _setIndexNavBtnState(){         // 设置nav状态
                                this.$store.commit('template/changeBtnState', {
                                        btn: ['Back', 'Text'],
                                        NavTextContent: this.name
                                });
                        },
                        _setFooterMenuState(payload){
                                this.$store.commit('template/changeFooterMenu', payload);
                        },
                        _initBScroll(){
                                this.BScroll = new BScroll(this.$refs.BScrollContent, {
                                        click: true,
                                        bounce: false,
                                })
                        },
                        addCart(){
                                this.changeType.state = false;
                                this.$http.post(api.cart.ADD,{pid:this.curProduct.id,num:this.selectNumber})
	                                .then(result=>{
	                                        if(result.ok){
	                                                this.$store.commit('cart/changeCartNum',this.selectNumber);
                                                        this.$alert.info(result.msg);                                        // 弹出成功提示
                                                        this.$store.commit('cart/changeInitState',true)         // 添加到购物车后打开购物车加载开关
	                                        }else{
	                                                this.$alert.info(`${result.msg}即将跳转至登陆页`);
                                                        this.$router.replace({path:'/login'});
	                                        }
	                                });
                        },
                        changeTypeState(){
                                this.changeType.state = !this.changeType.state;
                                this.BScroll.scrollTo(0, 0, 500);
                                this.$nextTick(() => {
                                        this.changeTypeBScroll = new BScroll(this.$refs.typeMenuBoxContent, {click: true, bounce: false})
                                });
                        },
	                changeTypeBtn(e,state){
                                let text = e.target.innerText;
                                switch(state){
	                                case 'color':
	                                        this.curType.color = text;
	                                        break;
	                                case 'type':
	                                        this.curType.type = text;
	                                        break;
                                        case 'size':
                                                this.curType.size = text;
	                                        break;
                                }
                                let {color,type,size} = this.curType;
                                this.curProduct = this.product.data.find(item =>item.color === color&&item.type ===  type&&item.size === size);
	                },
                        bay(){

                        }
                },
                activated(){
                        this.curParamsId = parseInt(this.$route.params.id);
                        this._productDataInit();
                        this._setFooterMenuState();
                },
                updated(){
                        this.isShow = true;
                },
                deactivated(){
                        this._setFooterMenuState(true);
                        this.isShow = false;
                        this.BScroll.destroy();
                        this.selectNumber = 1;
                        if(this.changeTypeBScroll) this.changeTypeBScroll.destroy();
                        this.$refs.BScrollSubContent.style.transform = 'translateY(0)';
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	$border = 0.01rem solid rgba(96, 96, 96, 0.2);
	.fade-enter-active, .fade-leave-active {
		transition: opacity .4s;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
	}

	.content
		background rgb(228, 228, 228)
		display flex
		flex-direction column

		.title-box
			flex-shrink 0
			height 1rem
			padding 0.2rem
			display flex
			background rgb(242, 242, 242)
			box-shadow 0 0.1rem 0.26rem rgba(0, 0, 0, .12)
			position relative
			top 0
			z-index 1

			.active
				background rgb(176, 176, 176)
				color rgb(238, 238, 238)

			div
				flex-grow 1
				text-align center
				line-height 0.6rem
				border-top $border
				border-bottom $border
				border-right $border
				font-weight 700
				color rgb(96, 96, 96)
				font-size 0.3rem

			div:first-child
				border-left $border
				border-bottom-left-radius 0.1rem
				border-top-left-radius 0.1rem

			div:last-child
				border-bottom-right-radius 0.1rem
				border-top-right-radius 0.1rem

		.subContent
			flex-grow 1
			overflow hidden

			.img-box
				width 100%
				padding-top 80%
				background-size 80%
				background-repeat no-repeat
				background-position center
				background-color #fff
				margin-bottom 0.2rem

			.message-box
				background-color #fff
				margin-bottom 0.2rem

				.message
					padding 0.2rem 0.4rem

			.type-select
				font-size 0.25rem
				font-weight 700
				padding 0.3rem 0.4rem
				background #fff
				margin-bottom 0.2rem

				.title
					color rgb(153, 153, 153)
					margin-bottom 0.1rem

				.type-box
					display flex
					align-items center

					& > div > div
						margin-bottom 0.1rem

				.type-box > div:first-child
					flex-grow 1

				.type-box > div:last-child
					width 0.16rem

					img
						width 100%

				.type-box > div > div > span:first-child
					font-weight normal
					margin-right 0.2rem

			.details
				background #fff

		.menu
			height 1.2rem
			width 100%
			display flex
			background #fff
			padding 0.1rem 0.2rem
			box-shadow 0 -11px 27px rgba(0,0,0,.08)
			.icon
				width 1rem
				background-image url('../assets/img/icon/icon_cart.png');
				background-position center
				background-repeat no-repeat
				background-size 55%
				position relative
				a
					width 100%
					height 100%
					display inline-block
					span
						width 0.3rem
						height 0.3rem
						border-radius 50%
						display block
						position absolute
						text-align center
						font-weight 700
						font-size 0.22rem
						line-height 0.3rem
						color #fff
						right 20%
						top 10%
						background rgb(290, 79, 70)

			.addCart
				flex-grow 1
				padding 0 0.2rem
				div
					height 100%

			.buy
				flex-grow 1
				div
					height 100%

		.mask-layer
			position fixed
			z-index 2
			width 100%
			height calc(100% - 1rem)
			background rgba(0, 0, 0, 0.5)
			top 0

	.changeTypeMenu
		border-bottom  0.01rem solid rgba(100,100,100,0.1)
		position fixed
		bottom 0.98rem
		width 100%
		z-index 3

		background #fff

		.top
			background linear-gradient(#fefefe, #f6f6f6)
			height 2rem
			flex-shrink 0
			box-shadow 0 0.05rem 0.13rem rgba(0, 0, 0, .12)

			.img-box
				position absolute
				top -0.3rem
				left 0.3rem
				width 2.5rem
				padding-top 2.5rem
				background-size 100%
				background-color #fff
				border-radius 0.15rem
				border 0.01rem solid rgba(100, 100, 100, 0.2)

			.msg-box
				margin 0.5rem 0.5rem 0 45%

		.typeMenuBox
			height 4.5rem
			overflow hidden

			.typeBox
				padding 0.2rem 0.3rem 0 0.3rem
				font-size 0

				div
					display inline-block
					padding 0.2rem 0.3rem
					font-size 0.26rem
					color rgb(102, 102, 102)
					border-radius 0.1rem
					border 0.01rem solid rgba(100, 100, 100, 0.1)
					margin 0 0.1rem 0.1rem

				.active
					font-weight 700
					border 0.01rem solid rgb(106, 143, 230)
		.countBtnBox
			padding 0.2rem
			display flex
			padding-left 0.3rem
			*
				width 0.6rem
				height 0.6rem
				text-align center
				line-height 0.6rem
				color rgb(102,102,102)
				font-weight 700
				font-size 0.3rem
				background-repeat no-repeat
				background-position center
				background-size 100%
				margin-right  0.2rem
				border 0
				outline none
			input:first-child
				background-image  url("../assets/img/icon/icon-reduce.png")
			input:last-child
				background-image  url("../assets/img/icon/icon-add.png")

</style>